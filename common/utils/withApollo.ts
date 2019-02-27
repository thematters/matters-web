import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import http from 'http'
import https from 'https'
import withApollo from 'next-with-apollo'
import getConfig from 'next/config'

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

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link: httpLink({ headers }),
      cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {})
    })
)
