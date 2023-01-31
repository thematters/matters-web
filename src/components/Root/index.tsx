import { useQuery } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import dynamic from 'next/dynamic'
import React from 'react'
import { createClient, createStorage, WagmiConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { chains, wagmiProvider } from '~/common/utils'
import {
  Error,
  FeaturesProvider,
  LanguageProvider,
  Layout,
  MediaContextProvider,
  QueryError,
  useRoute,
  ViewerProvider,
  ViewerUser,
} from '~/components'
import PageViewTracker from '~/components/Analytics/PageViewTracker'
import { RootQueryPrivateQuery } from '~/gql/graphql'

import { ROOT_QUERY_PRIVATE } from './gql'

const DynamicToastContainer = dynamic(
  () => import('~/components/Toast').then((mod) => mod.Toast.Container),
  { ssr: false }
)
const DynamicAnalyticsListener = dynamic(
  () => import('~/components/Analytics').then((mod) => mod.AnalyticsListener),
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
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        // For disconnecting from metamask
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider: wagmiProvider,
  /*
  FIXME: need to find a way of clearing ens name cache instead of clearing the global cache
  */
  storage: createStorage({
    storage: {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
    },
  }),
})

const Root = ({
  client,
  headers,
  children,
}: {
  client: ApolloClient<InMemoryCache>
  headers?: any
  children: React.ReactNode
}) => {
  const { isInPath } = useRoute()
  const isInAbout = isInPath('ABOUT')
  const isInMigration = isInPath('MIGRATION')
  const shouldApplyLayout = !isInAbout && !isInMigration

  const { loading, data, error } =
    useQuery<RootQueryPrivateQuery>(ROOT_QUERY_PRIVATE)
  const viewer = data?.viewer
  const official = data?.official

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
      <ViewerProvider viewer={viewer as ViewerUser}>
        <PageViewTracker />

        <LanguageProvider headers={headers}>
          <FeaturesProvider official={official}>
            <MediaContextProvider>
              {shouldApplyLayout ? <Layout>{children}</Layout> : children}

              <DynamicToastContainer />
              <DynamicAnalyticsListener user={viewer || {}} />
              <DynamicGlobalDialogs />
              <DynamicProgressBar />
              <DynamicFingerprint />
            </MediaContextProvider>
          </FeaturesProvider>
        </LanguageProvider>
      </ViewerProvider>
    </WagmiConfig>
  )
}

export default Root
