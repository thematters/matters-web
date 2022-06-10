import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { createClient, WagmiConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import {
  AnalyticsListener,
  Error,
  FeaturesProvider,
  LanguageProvider,
  Layout,
  QueryError,
  Toast,
  usePublicQuery,
  useRoute,
  ViewerProvider,
  ViewerUser,
} from '~/components'
import PageViewTracker from '~/components/Analytics/PageViewTracker'
import SplashScreen from '~/components/SplashScreen'

import { chains, sleep, wagmiProvider } from '~/common/utils'

import { ROOT_QUERY_PRIVATE, ROOT_QUERY_PUBLIC } from './gql'

import {
  RootQueryPrivate,
  RootQueryPrivate_viewer,
} from './__generated__/RootQueryPrivate'
import { RootQueryPublic } from './__generated__/RootQueryPublic'

const DynamicPushInitializer = dynamic(
  () => import('~/components/PushInitializer'),
  { ssr: false }
)
const DynamicProgressBar = dynamic(() => import('~/components/ProgressBar'), {
  ssr: false,
})
const DynamicGlobalDialogs = dynamic(
  () => import('~/components/GlobalDialogs'),
  { ssr: false }
)
const DynamicFingerprint = dynamic(() => import('~/components/Fingerprint'), {
  ssr: false,
})

/**
 * `<Root>` contains components that depend on viewer
 *
 */
// Sentry
import('@sentry/browser').then((Sentry) => {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    ignoreErrors: [/.*Timeout.*/, /.*Network.*/],
    sampleRate: 0.1,
  })
})

// WAGMI
const wagmiClient = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      options: {
        // infuraId: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '',
        qrcode: true,
      },
    }),
  ],
  provider: wagmiProvider,
})

const Root = ({
  client,
  children,
}: {
  client: ApolloClient<InMemoryCache>
  children: React.ReactNode
}) => {
  const { isInPath } = useRoute()
  const isInAbout = isInPath('ABOUT')
  const isInMigration = isInPath('MIGRATION')
  const shouldApplyLayout = !isInAbout && !isInMigration

  // anonymous
  const { loading, data, error } =
    usePublicQuery<RootQueryPublic>(ROOT_QUERY_PUBLIC)
  const viewer = data?.viewer
  const official = data?.official

  // viewer
  const [privateViewer, setPrivateViewer] = useState<RootQueryPrivate_viewer>()
  const [privateFetched, setPrivateFetched] = useState(false)

  const fetchPrivateViewer = async () => {
    try {
      const privateWatcher = client.watchQuery<RootQueryPrivate>({
        query: ROOT_QUERY_PRIVATE,
        fetchPolicy: 'network-only',
      })
      privateWatcher.subscribe({
        next: (result) => {
          // set private viewer
          if (result?.data?.viewer) {
            setPrivateViewer(result?.data?.viewer)
          }
          // mark private fetched as true
          setPrivateFetched(true)
        },
        error: (e) => {
          // mark private fetched as true
          setPrivateFetched(true)

          console.error(e)
        },
      })

      // timeout to mark private fetched as true
      await sleep(2000)
      if (!privateFetched) {
        setPrivateFetched(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (!data) {
      return
    }
    fetchPrivateViewer()
  }, [!!data])

  /**
   * Render
   */
  if (loading) {
    return null
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!viewer) {
    return <Error />
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <ViewerProvider
        viewer={(privateViewer || viewer) as ViewerUser}
        privateFetched={privateFetched}
      >
        <SplashScreen />
        <PageViewTracker />

        <LanguageProvider>
          <FeaturesProvider official={official}>
            {shouldApplyLayout ? <Layout>{children}</Layout> : children}

            <Toast.Container />
            <AnalyticsListener user={viewer || {}} />
            <DynamicGlobalDialogs />
            <DynamicProgressBar />
            <DynamicPushInitializer client={client} />
            <DynamicFingerprint />
          </FeaturesProvider>
        </LanguageProvider>
      </ViewerProvider>
    </WagmiConfig>
  )
}

export default Root
