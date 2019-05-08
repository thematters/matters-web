import * as Sentry from '@sentry/browser'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
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

import withApollo from '~/common/utils/withApollo'

import { RootQuery } from './__generated__/RootQuery'

// start Sentry
const {
  publicRuntimeConfig: { SENTRY_DSN }
} = getConfig()

Sentry.init({ dsn: SENTRY_DSN || '' })

class MattersApp extends App<{ apollo: ApolloClient<InMemoryCache> }> {
  public query = gql`
    query RootQuery {
      viewer {
        id
        ...LayoutUser
      }
    }
    ${Layout.fragments.user}
  `

  public render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <ErrorBoundary>
          <AnalyticsProvider>
            <ModalProvider>
              <ApolloProvider client={apollo}>
                <GlobalStyles />
                <Query query={this.query}>
                  {({
                    data,
                    loading,
                    error,
                    refetch
                  }: QueryResult & { data: RootQuery }) => (
                    <Layout
                      loading={loading}
                      user={data && data.viewer}
                      error={error}
                      refetch={refetch}
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
