import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import {
  AnalyticsListener,
  Error,
  FeaturesProvider,
  LanguageProvider,
  Layout,
  Toast,
  usePublicQuery,
  ViewerProvider,
} from '~/components'
import PageViewTracker from '~/components/Analytics/PageViewTracker'
import { QueryError } from '~/components/GQL'
import SplashScreen from '~/components/SplashScreen'

import { PATHS } from '~/common/enums'

import { ROOT_QUERY_PRIVATE, ROOT_QUERY_PUBLIC } from './gql'

import { RootQueryPublic } from './__generated__/RootQueryPublic'

const DynamicPushInitializer = dynamic(
  () => import('~/components/PushInitializer'),
  {
    ssr: false,
  }
)
const DynamicProgressBar = dynamic(() => import('~/components/ProgressBar'), {
  ssr: false,
})
const DynamicGlobalDialogs = dynamic(
  () => import('~/components/GlobalDialogs'),
  {
    ssr: false,
  }
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
    ignoreErrors: ['Timeout', 'Network error'],
  })
})

const Root = ({
  client,
  children,
}: {
  client: ApolloClient<InMemoryCache>
  children: React.ReactNode
}) => {
  const router = useRouter()
  const isInAbout = router.pathname === PATHS.ABOUT
  const isInMigration = router.pathname === PATHS.MIGRATION
  const shouldApplyLayout = !isInAbout && !isInMigration

  // anonymous
  const { loading, data, error } = usePublicQuery<RootQueryPublic>(
    ROOT_QUERY_PUBLIC
  )
  const viewer = data?.viewer
  const official = data?.official

  // viewer
  const [privateFetched, setPrivateFetched] = useState(false)
  const fetchPrivateViewer = async () => {
    try {
      await client.query({
        query: ROOT_QUERY_PRIVATE,
        fetchPolicy: 'network-only',
      })
    } catch (e) {
      console.error(e)
      setPrivateFetched(true)
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
    <ViewerProvider viewer={viewer} privateFetched={privateFetched}>
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
  )
}

export default Root
