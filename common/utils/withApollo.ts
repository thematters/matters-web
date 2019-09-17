import { createUploadLink } from '@matters/apollo-upload-client'
import * as Sentry from '@sentry/browser'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import http from 'http'
import https from 'https'
import withApollo from 'next-with-apollo'
import getConfig from 'next/config'

import introspectionQueryResultData from '~/common/gql/fragmentTypes.json'
import { genSentryActionId } from '~/common/utils'

// import { setupPersistCache } from './cache'
import resolvers from './resolvers'
import typeDefs from './types'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})
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
const persistedQueryLink = createPersistedQueryLink({
  useGETForHashedQueries: true
})

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
      'x-client-name': 'web',
      'x-access-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiY2FkNTdjMGEtYWQxOC00OGIzLTg0N2MtYjM1ZjBkYWE2M2MyIiwiaWF0IjoxNTY4NjQ5Nzc2LCJleHAiOjkzNDQ2NDk3NzZ9.qMct4tgrVXf8Y6YERVBph9E_tj5BKGOwx4v66KIjI_4'
    }
  }
})

const sentryLink = setContext((_, { headers }) => {
  // Add action id for Sentry
  const actionId = genSentryActionId()
  Sentry.configureScope((scope: any) => {
    scope.setTag('action-id', actionId)
  })

  return {
    headers: {
      ...headers,
      'x-sentry-action-id': actionId
    }
  }
})

export default withApollo(({ ctx, headers, initialState }) => {
  const inMemoryCache = new InMemoryCache({ fragmentMatcher })
  inMemoryCache.restore(initialState || {})

  // setupPersistCache(inMemoryCache)

  return new ApolloClient({
    link: ApolloLink.from([
      persistedQueryLink,
      errorLink,
      authLink,
      sentryLink,
      dataLink({ headers })
    ]),
    cache: inMemoryCache,
    resolvers,
    typeDefs
  })
})
