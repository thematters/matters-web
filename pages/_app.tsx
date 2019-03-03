import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider, Query, QueryResult } from 'react-apollo'

import { AnalyticsProvider } from '~/components/Analytics'
import { GlobalStyles } from '~/components/GlobalStyles'
import { Layout } from '~/components/Layout'
import { ModalProvider } from '~/components/ModalManager'

import withApollo from '~/common/utils/withApollo'

import { RootQuery } from './__generated__/RootQuery'

class MattersApp extends App<{ apollo: ApolloClient<InMemoryCache> }> {
  // public static async getInitialProps({ Component, ctx }: NextAppContext) {
  //   let pageProps = {}

  //   if (Component.getInitialProps) {
  //     console.log('Component.getInitialProps')
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   return { pageProps }
  // }

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
        <AnalyticsProvider>
          <ModalProvider>
            <ApolloProvider client={apollo}>
              <GlobalStyles />
              <Query query={this.query}>
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
      </Container>
    )
  }
}

export default withApollo(MattersApp)
