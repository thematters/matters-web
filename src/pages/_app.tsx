import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import App from 'next/app'
import getConfig from 'next/config'
import React, { useEffect } from 'react'

import {
  AnalyticsListener,
  Error,
  ErrorBoundary,
  LanguageProvider,
  Toast,
  ViewerFragments,
  ViewerProvider
} from '~/components'
import { ClientUpdater } from '~/components/ClientUpdater'
import { GlobalDialogs } from '~/components/GlobalDialogs'
import { GlobalStyles } from '~/components/GlobalStyles'
import { QueryError } from '~/components/GQL'
import { ProgressBar } from '~/components/ProgressBar'
import PushInitializer from '~/components/PushInitializer'

import { analytics } from '~/common/utils'
import withApollo from '~/common/utils/withApollo'

import { RootQuery } from './__generated__/RootQuery'

const ROOT_QUERY = gql`
  query RootQuery {
    viewer {
      id
      ...ViewerUser
      ...AnalyticsUser
    }
  }
  ${ViewerFragments.user}
  ${AnalyticsListener.fragments.user}
`

// Sentry
import('@sentry/browser').then(Sentry => {
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
  useEffect(() => {
    analytics.trackPage({ path: window.location.pathname })
  })

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
        {children}

        <GlobalDialogs />
        <Toast.Container />
        <ProgressBar />

        <AnalyticsListener user={viewer || {}} />
        <PushInitializer client={client} />
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
          <ClientUpdater />

          <Root client={apollo}>
            <Component {...pageProps} />
          </Root>
        </ApolloProvider>
      </ErrorBoundary>
    )
  }
}

export default withApollo(MattersApp)
