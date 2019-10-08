import * as Sentry from '@sentry/browser'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import App, { Container } from 'next/app'
import getConfig from 'next/config'
import React from 'react'
import { ApolloProvider, QueryResult } from 'react-apollo'

import {
  AnalyticsProvider,
  GlobalStyles,
  Layout,
  ModalProvider
} from '~/components'
import ErrorBoundary from '~/components/ErrorBoundary'
import { Query } from '~/components/GQL'
import { RootQuery } from '~/components/GQL/queries/__generated__/RootQuery'
import ROOT_QUERY from '~/components/GQL/queries/rootQuery'

import withApollo from '~/common/utils/withApollo'

// start Sentry
const {
  publicRuntimeConfig: { SENTRY_DSN }
} = getConfig()

Sentry.init({ dsn: SENTRY_DSN || '' })

class MattersApp extends App<{ apollo: ApolloClient<InMemoryCache> }> {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <ErrorBoundary>
          <AnalyticsProvider>
            <ModalProvider>
              <ApolloProvider client={apollo}>
                <GlobalStyles />
                <Query query={ROOT_QUERY}>
                  {({
                    data,
                    loading,
                    error
                  }: QueryResult & { data: RootQuery }) => (
                    <Layout
                      loading={loading}
                      user={data && data.viewer}
                      error={error}
                    >
                      <Component {...pageProps} />
                    </Layout>
                  )}
                </Query>
              </ApolloProvider>
            </ModalProvider>
          </AnalyticsProvider>
        </ErrorBoundary>
      </Container>
    )
  }
}

export default withApollo(MattersApp)
