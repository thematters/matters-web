import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import http from 'http'
import https from 'https'
import withApollo from 'next-with-apollo'
import getConfig from 'next/config'

import { LOCAL_LANG_KEY, DEFAULT_LANG } from '~/common/enums'
import introspectionQueryResultData from '~/common/gql/fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const {
  publicRuntimeConfig: { API_URL }
} = getConfig()

// toggle http for local dev
const agent =
  API_URL.split(':')[0] === 'http'
    ? new http.Agent()
    : new https.Agent({
        rejectUnauthorized: process.env.NODE_ENV !== 'development' // allow access to https:...matters.news in localhost
      })

const httpLink = ({ headers }: { [key: string]: any }) =>
  createHttpLink({
    uri: API_URL,
    credentials: 'include',
    headers,
    fetchOptions: {
      agent
    }
  })

const authLink = setContext((_, { headers }) => {
  const language = process.browser
    ? (localStorage.getItem(LOCAL_LANG_KEY) as Language)
    : DEFAULT_LANG

  return {
    headers: {
      ...headers,
      'Accept-Language': language
    }
  }
})

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link: authLink.concat(httpLink({ headers })),
      cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {})
    })
)
