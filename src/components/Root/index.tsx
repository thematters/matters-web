import { useQuery } from '@apollo/client'
import type { IncomingHttpHeaders } from 'http'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { WagmiConfig } from 'wagmi'

import {
  REFERRAL_QUERY_REFERRAL_KEY,
  REFERRAL_STORAGE_REFERRAL_CODE,
} from '~/common/enums'
import { storage, wagmiConfig } from '~/common/utils'
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
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    ignoreErrors: [/.*Timeout.*/, /.*Network.*/],
    sampleRate: 0.1,
  })
})

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
  const isInMeDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const shouldApplyLayout =
    !isInAbout &&
    !isInMigration &&
    !isInAuthCallback &&
    !isInAuth &&
    !isInMeDraftDetail

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
    <WagmiConfig config={wagmiConfig}>
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
    </WagmiConfig>
  )
}

export default Root
