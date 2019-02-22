import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import https from 'https'
import withApollo from 'next-with-apollo'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API_URL }
} = getConfig()

const httpLink = ({ headers }: { [key: string]: any }) =>
  createHttpLink({
    uri: API_URL,
    credentials: 'include',
    headers,
    fetchOptions: {
      agent: new https.Agent({
        rejectUnauthorized: process.env.NODE_ENV !== 'development' // allow access to https:...matters.news in localhost
      })
    }
  })

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link: httpLink({ headers }),
      cache: new InMemoryCache().restore(initialState || {})
    })
)
