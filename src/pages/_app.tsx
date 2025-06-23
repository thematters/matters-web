import '~/common/styles/variables/colors.css'
import '~/common/styles/variables/shadows.css'
import '~/common/styles/variables/sizing.css'
import '~/common/styles/variables/spacing.css'
import '~/common/styles/variables/typography.css'
import '~/common/styles/variables/z-index.css'
import '~/common/styles/bases/reset.css'
import '~/common/styles/bases/defaults.css'
import '~/common/styles/utils/content.article.css'
import '~/common/styles/utils/content.moment.css'
import '~/common/styles/utils/content.comment.css'
import '~/common/styles/utils/index.css'
import '~/common/styles/vendors/reach.css'
import '~/common/styles/vendors/fresnel.css'
import '~/common/styles/vendors/tippy.css'
import '~/common/styles/vendors/walletconnect.css'
import '~/common/styles/components/switch.css'
import '~/common/styles/components/gsc.css'
import '~/common/styles/components/ngprogress.css'
import '~/common/styles/components/stripe.css'
import '~/common/styles/components/subscriberAnalytics.css'

import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client'
import type { IncomingHttpHeaders } from 'http'
import { NextPageContext } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'

import { getApollo } from '~/common/utils/apollo'
import { ErrorBoundary } from '~/components'
import { ClientUpdater } from '~/components/ClientUpdater'
import Root from '~/components/Root'
import TokenExpirationChecker from '~/components/TokenExpirationChecker'

type AppOwnProps = {
  apolloClient?: ApolloClient<NormalizedCacheObject>
  apolloState?: object
  headers?: IncomingHttpHeaders
}

export interface MattersPageContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
}

export interface MattersAppContext extends AppContext {
  ctx: MattersPageContext
}

function MattersApp({
  Component,
  pageProps,
  apolloClient,
  apolloState,
  headers,
}: AppOwnProps & AppProps) {
  const apollo = apolloClient ?? getApollo(apolloState, headers)

  return (
    <ErrorBoundary>
      <ApolloProvider client={apollo}>
        <Root headers={headers}>
          <Component {...pageProps} />
          <ClientUpdater />
          <TokenExpirationChecker />
        </Root>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

MattersApp.getInitialProps = async (
  context: MattersAppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const { AppTree, Component, ctx } = context
  const headers = ctx.req?.headers || {}

  const apolloClient = (ctx.apolloClient = getApollo({}, headers))

  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  if (typeof window === 'undefined') {
    if (ctx.res && ctx.res.writableEnded) {
      return { pageProps }
    }

    const { getDataFromTree } = await import('@apollo/client/react/ssr')

    try {
      await getDataFromTree(
        <AppTree
          Component={Component}
          pageProps={pageProps}
          apolloClient={apolloClient}
        />,
        apolloClient.cache.extract()
      )
    } catch (error) {
      console.error('Error while runing `getDataFromTree`', error)
    }
  }

  const apolloState = apolloClient.cache.extract()

  // @ts-expect-error toJSON is not defined in the ApolloClient type
  apolloClient.toJSON = () => null

  return {
    pageProps,
    apolloClient,
    apolloState,
    headers,
  }
}

export default MattersApp
