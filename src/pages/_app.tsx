import * as Sentry from '@sentry/browser'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import * as firebase from 'firebase/app'
import 'firebase/messaging'
import App from 'next/app'
import getConfig from 'next/config'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

import {
  AnalyticsProvider,
  GlobalStyles,
  LanguageProvider,
  Layout,
  ModalProvider
} from '~/components'
import ErrorBoundary from '~/components/ErrorBoundary'

import withApollo from '~/common/utils/withApollo'

/**
 * Init
 */
const {
  publicRuntimeConfig: { SENTRY_DSN, FIREBASE_CONFIG, FCM_VAPID_KEY }
} = getConfig()

// Sentry
Sentry.init({ dsn: SENTRY_DSN || '' })

// Firebase
// FIXME: https://github.com/zeit/next.js/issues/1999
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
  const messaging = firebase.messaging()
  messaging.usePublicVapidKey(FCM_VAPID_KEY)
}

class MattersApp extends App<{ apollo: ApolloClient<InMemoryCache> }> {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <ErrorBoundary>
        <ApolloProvider client={apollo}>
          <LanguageProvider>
            <AnalyticsProvider>
              <ModalProvider>
                <GlobalStyles />

                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ModalProvider>
            </AnalyticsProvider>
          </LanguageProvider>
        </ApolloProvider>
      </ErrorBoundary>
    )
  }
}

export default withApollo(MattersApp)
