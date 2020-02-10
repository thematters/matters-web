import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import App from 'next/app'
import getConfig from 'next/config'
import React from 'react'

import {
  AnalyticsListener,
  AnalyticsProvider,
  GlobalHeader,
  GlobalStyles,
  LanguageProvider,
  Modal,
  ModalProvider,
  Toast
} from '~/components'
import { Error } from '~/components/Error'
import ErrorBoundary from '~/components/ErrorBoundary'
import { HeaderContextProvider } from '~/components/GlobalHeader/Context'
import { QueryError } from '~/components/GQL'
import { Head } from '~/components/Head'
import ProgressBar from '~/components/ProgressBar'
import PushInitializer from '~/components/PushInitializer'
import { ViewerFragments, ViewerProvider } from '~/components/Viewer'

import withApollo from '~/common/utils/withApollo'

import { RootQuery } from './__generated__/RootQuery'

const ROOT_QUERY = gql`
  query RootQuery {
    viewer {
      id
      ...ViewerUser
      ...GlobalHeaderUser
      ...AnalyticsUser
    }
  }
  ${ViewerFragments.user}
  ${GlobalHeader.fragments.user}
  ${AnalyticsListener.fragments.user}
`

// Sentry
import(
  /* webpackMode: "lazy-once" */
  '@sentry/browser'
).then(Sentry => {
  /**
   * Initialize
   */
  const {
    publicRuntimeConfig: { SENTRY_DSN }
  } = getConfig()
  Sentry.init({ dsn: SENTRY_DSN || '' })
})

/**
 * `<Root>` contains components that depend on viewer
 *
 */
const Root = ({
  client,
  children
}: {
  client: ApolloClient<InMemoryCache>
  children: React.ReactNode
}) => {
  const { loading, data, error } = useQuery<RootQuery>(ROOT_QUERY)
  const viewer = data?.viewer

  if (loading) {
    return null
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!viewer) {
    return <Error />
  }

  return (
    <ViewerProvider viewer={viewer}>
      <LanguageProvider>
        <ModalProvider>
          <HeaderContextProvider>
            <Head />
            <GlobalHeader user={viewer} />

            {children}

            <AnalyticsListener user={viewer || {}} />
            <PushInitializer client={client} />
            <Modal.Anchor />
            <Toast.Container />
            <ProgressBar />
          </HeaderContextProvider>
        </ModalProvider>
      </LanguageProvider>
    </ViewerProvider>
  )
}

class MattersApp extends App<{ apollo: ApolloClient<InMemoryCache> }> {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <ErrorBoundary>
        <ApolloProvider client={apollo}>
          <GlobalStyles />
          <AnalyticsProvider />

          <Root client={apollo}>
            <Component {...pageProps} />
          </Root>
        </ApolloProvider>
      </ErrorBoundary>
    )
  }
}

export default withApollo(MattersApp)
