import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client'
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

const httpUploadLink = ({ headers }: { [key: string]: any }) =>
  createUploadLink({
    uri: API_URL,
    credentials: 'include',
    headers,
    fetchOptions: {
      agent
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

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link: authLink.concat(httpUploadLink({ headers })),
      cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {})
    })
)
