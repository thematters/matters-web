import { useQuery } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import dynamic from 'next/dynamic'
import React from 'react'

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
import { RootQueryPrivateQuery } from '~/gql/graphql'

import { ROOT_QUERY_PRIVATE } from './gql'

const DynamicToastContainer = dynamic(
  () => import('~/components/Toast').then((mod) => mod.Toast.Container),
  { ssr: false }
)
const DynamicAnalyticsInitilizer = dynamic(
  () => import('~/components/Analytics').then((mod) => mod.AnalyticsInitilizer),
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
    <ViewerProvider viewer={viewer as ViewerUser}>
      <LanguageProvider headers={headers}>
        <FeaturesProvider official={official}>
          <MediaContextProvider>
            {shouldApplyLayout ? <Layout>{children}</Layout> : children}

            <DynamicToastContainer />
            <DynamicAnalyticsInitilizer user={viewer || {}} />
            <DynamicGlobalDialogs />
            <DynamicProgressBar />
            <DynamicFingerprint />
          </MediaContextProvider>
        </FeaturesProvider>
      </LanguageProvider>
    </ViewerProvider>
  )
}

export default Root
