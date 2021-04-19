import { ApolloClient, ApolloProvider } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { AppProps } from 'next/app'

import { ErrorBoundary } from '~/components'
import { ClientUpdater } from '~/components/ClientUpdater'
import { GlobalStyles } from '~/components/GlobalStyles'
import Root from '~/components/Root'

import withApollo from '~/common/utils/withApollo'

const InnerApp = ({
  Component,
  pageProps,
  apollo,
}: AppProps & { apollo: ApolloClient<InMemoryCache> }) => (
  <ErrorBoundary>
    <ApolloProvider client={apollo}>
      <GlobalStyles />

      <Root client={apollo}>
        <Component {...pageProps} />

        <ClientUpdater />
      </Root>
    </ApolloProvider>
  </ErrorBoundary>
)

const MattersApp = withApollo(InnerApp, { getDataFromTree })

export default MattersApp
