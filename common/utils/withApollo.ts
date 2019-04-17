import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { WebSocketLink } from 'apollo-link-ws'
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from 'apollo-utilities'
import http from 'http'
import https from 'https'
import withApollo from 'next-with-apollo'
import getConfig from 'next/config'

import {
  inMemoryCache
  // setupPersistCache
} from './cache'

const isProd = process.env.NODE_ENV === 'production'

const {
  publicRuntimeConfig: { API_URL, WS_URL }
} = getConfig()

// toggle http for local dev
const agent =
  API_URL.split(':')[0] === 'http'
    ? new http.Agent()
    : new https.Agent({
        rejectUnauthorized: isProd // allow access to https:...matters.news in localhost
      })

// links
const httpLink = ({ headers }: { [key: string]: any }) =>
  createUploadLink({
    uri: API_URL,
    credentials: 'include',
    headers,
    fetchOptions: {
      agent
    }
  })

// only do ws with browser
const wsLink = process.browser
  ? new WebSocketLink({
      uri: WS_URL,
      options: {
        reconnect: true
      }
    })
  : null

const dataLink = process.browser
  ? ({ headers }: { [key: string]: any }) =>
      split(
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query)
          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink as WebSocketLink,
        httpLink({ headers })
      )
  : httpLink

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, extensions, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${JSON.stringify(path)}, Code: ${extensions.code}`
      )
    )
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-client-name': 'web'
    }
  }
})

export default withApollo(({ ctx, headers, initialState }) => {
  inMemoryCache.restore(initialState || {})

  // setupPersistCache()

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, dataLink({ headers })]),
    cache: inMemoryCache
  })
})
