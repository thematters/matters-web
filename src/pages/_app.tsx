import { ApolloProvider } from '@apollo/react-hooks'
import { getDataFromTree } from '@apollo/react-ssr'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { AppProps } from 'next/app'

import { ErrorBoundary } from '~/components'
import { ClientUpdater } from '~/components/ClientUpdater'
import { GlobalStyles } from '~/components/GlobalStyles'
import Root from '~/components/Root'
import SplashScreen from '~/components/SplashScreen'

import withApollo from '~/common/utils/withApollo'

const MattersApp = ({
  Component,
  pageProps,
  apollo,
}: AppProps & { apollo: ApolloClient<InMemoryCache> }) => (
  <ErrorBoundary>
    <ApolloProvider client={apollo}>
      <GlobalStyles />
      <SplashScreen />
      <ClientUpdater />

      <Root client={apollo}>
        <Component {...pageProps} />
      </Root>
    </ApolloProvider>
  </ErrorBoundary>
)

export default withApollo(MattersApp, { getDataFromTree })
