import ApolloClient, { InMemoryCache } from 'apollo-boost'
import App, { Container, NextAppContext } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

import withApollo from '~/common/utils/withApollo'
import { GlobalStyles, LanguageProvider, Layout } from '~/components'

class MattersApp extends App<{ apollo: ApolloClient<InMemoryCache> }> {
  // public static async getInitialProps({ Component, ctx }: NextAppContext) {
  //   let pageProps = {}

  //   if (Component.getInitialProps) {
  //     console.log('Component.getInitialProps')
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   return { pageProps }
  // }

  public render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <LanguageProvider>
          <ApolloProvider client={apollo}>
            <GlobalStyles />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </LanguageProvider>
      </Container>
    )
  }
}

export default withApollo(MattersApp)
