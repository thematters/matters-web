import ApolloClient, { InMemoryCache } from 'apollo-boost'
import withApollo from 'next-with-apollo'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API_URL }
} = getConfig()

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: API_URL,
      cache: new InMemoryCache().restore(initialState || {}),
      headers
    })
)
