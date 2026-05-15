import { useQuery } from '@apollo/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { IncomingHttpHeaders } from 'http'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { WagmiProvider } from 'wagmi'

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
  DrawerProvider,
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
import { ChannelsProvider, FetchPolicyProvider } from '~/components/Context'
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
const DynamicFetchPolicyOnRouteChange = dynamic(
  () =>
    import('~/components/Context/FetchPolicy').then(
      (mod) => mod.FetchPolicyOnRouteChange
    ),
  { ssr: false }
)

/**
 * `<Root>` contains components that depend on viewer
 *
 */
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
  const isInMeDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const isInArticleDetailEdit = isInPath('ARTICLE_DETAIL_EDIT')
  const shouldApplyLayout =
    !isInAbout &&
    !isInMigration &&
    !isInAuthCallback &&
    !isInAuth &&
    !isInMeDraftDetail &&
    !isInArticleDetailEdit

  const referralCode = getQuery(REFERRAL_QUERY_REFERRAL_KEY)

  const { loading, data, error } =
    useQuery<RootQueryPrivateQuery>(ROOT_QUERY_PRIVATE)
  const viewer = data?.viewer
  const official = data?.official
  const channels = data?.channels

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
                  <FetchPolicyProvider>
                    <ChannelsProvider channels={channels || []}>
                      {shouldApplyLayout ? (
                        <DrawerProvider>
                          <Layout>{children}</Layout>
                        </DrawerProvider>
                      ) : (
                        children
                      )}

                      <DynamicToaster />
                      <DynamicAnalyticsInitilizer user={viewer || {}} />
                      <DynamicGlobalDialogs />
                      <DynamicGlobalToasts />
                      <DynamicProgressBar />
                      <DynamicFingerprint />
                      <DynamicFetchPolicyOnRouteChange />
                    </ChannelsProvider>
                  </FetchPolicyProvider>
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
