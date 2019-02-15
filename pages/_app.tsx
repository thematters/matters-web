import ApolloClient, { gql, InMemoryCache } from 'apollo-boost'
import App, { Container, NextAppContext } from 'next/app'
import React from 'react'
import { ApolloProvider, Query } from 'react-apollo'

import withApollo from '~/common/utils/withApollo'
import {
  AnalyticsProvider,
  GlobalStyles,
  LanguageProvider,
  Layout
} from '~/components'

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
          <LanguageProvider>
            <ApolloProvider client={apollo}>
              <GlobalStyles />
              <Query query={this.query}>
                {({ data, loading, error }) => (
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
          </LanguageProvider>
        </AnalyticsProvider>
      </Container>
    )
  }
}

export default withApollo(MattersApp)
