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
import '~/common/styles/vendors/tippy.css'
import '~/common/styles/vendors/walletconnect.css'
import '~/common/styles/components/switch.css'
import '~/common/styles/components/gsc.css'
import '~/common/styles/components/ngprogress.css'
import '~/common/styles/components/stripe.css'
import '~/common/styles/components/subscriberAnalytics.css'

import { ApolloProvider } from '@apollo/client'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import type { IncomingHttpHeaders } from 'http'

import createApolloClient from '~/common/utils/apollo'
import { ErrorBoundary } from '~/components'
import { ClientUpdater } from '~/components/ClientUpdater'
import Root from '~/components/Root'

type AppOwnProps = {
  headers: IncomingHttpHeaders
}

function MattersApp({ Component, pageProps, headers }: AppOwnProps & AppProps) {
  const apollo = createApolloClient({ headers })

  return (
    <ErrorBoundary>
      <ApolloProvider client={apollo}>
        <Root client={apollo} headers={headers}>
          <Component {...pageProps} />
          <ClientUpdater />
        </Root>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

MattersApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)

  return {
    ...ctx,
    headers: context.ctx.req?.headers ?? {}
  }
}

export default MattersApp
