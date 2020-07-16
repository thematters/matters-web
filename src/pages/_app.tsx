import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
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
