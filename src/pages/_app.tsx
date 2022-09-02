import { ApolloProvider } from '@apollo/react-hooks'
import { getDataFromTree } from '@apollo/react-ssr'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { NextPageContext } from 'next'
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
  headers,
}: AppProps & {
  apollo: ApolloClient<InMemoryCache>
  headers?: any
}) => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={apollo}>
        <GlobalStyles />

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

  return { headers: ctx?.req?.headers }
}

const MattersApp = withApollo(InnerApp as any, { getDataFromTree })

export default MattersApp
