import '~/common/styles/variables/colors.css'
import '~/common/styles/variables/shadows.css'
import '~/common/styles/variables/sizing.css'
import '~/common/styles/variables/spacing.css'
import '~/common/styles/variables/typography.css'
import '~/common/styles/variables/z-index.css'
import '~/common/styles/bases/reset.css'
import '~/common/styles/bases/defaults.css'
import '~/common/styles/utils/content.article.css'
import '~/common/styles/utils/content.comment.css'
import '~/common/styles/utils/index.css'
import '~/common/styles/vendors/reach.css'
import '~/common/styles/vendors/fresnel.css'
import '~/common/styles/vendors/ptr.css'
import '~/common/styles/vendors/tippy.css'
import '~/common/styles/vendors/walletconnect.css'
import '~/common/styles/components/switch.css'
import '~/common/styles/components/dialog.css'
import '~/common/styles/components/gsc.css'
import '~/common/styles/components/ngprogress.css'
import '~/common/styles/components/sideDrawerNav.css'
import '~/common/styles/components/stripe.css'
import '~/common/styles/components/subscriberAnalytics.css'

import { ApolloProvider } from '@apollo/react-hooks'
import { getDataFromTree } from '@apollo/react-ssr'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { NextPageContext } from 'next'
import { AppProps } from 'next/app'

import withApollo from '~/common/utils/withApollo'
import { ErrorBoundary } from '~/components'
import { ClientUpdater } from '~/components/ClientUpdater'
import Root from '~/components/Root'

const InnerApp = ({
  Component,
  pageProps,
  apollo,
  headers,
}: AppProps & {
  apollo: ApolloClient<InMemoryCache>
  headers?: any
}) => {
  return (
    <ErrorBoundary>
      <style>
        @import
        url(`https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap`)
      </style>
      <ApolloProvider client={apollo}>
        <Root client={apollo} headers={headers}>
          <Component {...pageProps} />
          <ClientUpdater />
        </Root>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

InnerApp.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  if (!ctx) {
    return { headers: {} }
  }

  return {
    headers: ctx?.req?.headers,
  }
}

const MattersApp = withApollo(InnerApp as any, { getDataFromTree })

export default MattersApp
