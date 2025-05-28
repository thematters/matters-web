import { useQuery } from '@apollo/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { excludeGraphQLFetch } from 'apollo-link-sentry'
import type { IncomingHttpHeaders } from 'http'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { WagmiProvider } from 'wagmi'

import packageJson from '@/package.json'
import {
  REFERRAL_QUERY_REFERRAL_KEY,
  REFERRAL_STORAGE_REFERRAL_CODE,
} from '~/common/enums'
import {
  analytics,
  getTarget,
  redirectToTarget,
  storage,
  wagmiConfig,
} from '~/common/utils'
import {
  Error,
  FeaturesProvider,
  LanguageProvider,
  Layout,
  MediaContextProvider,
  QueryError,
  TranslationsProvider,
  useRoute,
  ViewerProvider,
} from '~/components'
import { RootQueryPrivateQuery } from '~/gql/graphql'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

import { ROOT_QUERY_PRIVATE } from './gql'

const DynamicToaster = dynamic(
  () => import('~/components/Toast').then((mod) => mod.Toaster),
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

const DynamicGlobalToasts = dynamic(() => import('~/components/GlobalToasts'), {
  ssr: false,
})
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
    enabled: !isLocal && typeof window !== 'undefined',
    dsn: `https://${process.env.NEXT_PUBLIC_SENTRY_PUBLIC_KEY}@${process.env.NEXT_PUBLIC_SENTRY_DOMAIN}/${process.env.NEXT_PUBLIC_SENTRY_PROJECT_ID}`,
    debug: !isProd,
    environment: isProd ? 'production' : 'development',
    release: packageJson.version,
    ignoreErrors: [/.*Timeout.*/, /.*Network.*/],
    sampleRate: 0.1,
    tracesSampleRate: 0.1,
    beforeBreadcrumb: excludeGraphQLFetch,
    integrations: [Sentry.browserTracingIntegration()],
    tracePropagationTargets: ['localhost', /graphql/],
  })
})

const queryClient = new QueryClient()

const Root = ({
  headers,
  children,
}: {
  headers?: IncomingHttpHeaders
  children: React.ReactNode
}) => {
  const { getQuery, isInPath } = useRoute()

  const isInAbout = isInPath('ABOUT')
  const isInMigration = isInPath('MIGRATION')
  const isInAuthCallback = isInPath('CALLBACK_PROVIDER')
  const isInAuth = isInPath('LOGIN') || isInPath('SIGNUP')
  const shouldApplyLayout =
    !isInAbout && !isInMigration && !isInAuthCallback && !isInAuth

  const referralCode = getQuery(REFERRAL_QUERY_REFERRAL_KEY)

  const { loading, data, error } =
    useQuery<RootQueryPrivateQuery>(ROOT_QUERY_PRIVATE)
  const viewer = data?.viewer
  const official = data?.official

  useEffect(() => {
    if (referralCode) {
      storage.set(REFERRAL_STORAGE_REFERRAL_CODE, { referralCode })
    }
  }, [])

  useEffect(() => {
    if (!viewer?.id) return

    // identify user
    analytics.identifyUser()

    // redirect after logged-in
    if (!getTarget()) {
      return
    }

    if (isInAuth || isInAuthCallback) {
      redirectToTarget({ fallback: 'homepage' })
    } else {
      redirectToTarget({ fallback: 'current' })
    }
  }, [viewer?.id])

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
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ViewerProvider viewer={viewer}>
          <LanguageProvider headers={headers}>
            <FeaturesProvider official={official}>
              <MediaContextProvider>
                <TranslationsProvider>
                  {shouldApplyLayout ? <Layout>{children}</Layout> : children}

                  <DynamicToaster />
                  <DynamicAnalyticsInitilizer user={viewer || {}} />
                  <DynamicGlobalDialogs />
                  <DynamicGlobalToasts />
                  <DynamicProgressBar />
                  <DynamicFingerprint />
                </TranslationsProvider>
              </MediaContextProvider>
            </FeaturesProvider>
          </LanguageProvider>
        </ViewerProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Root
