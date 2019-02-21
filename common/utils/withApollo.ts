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
      headers: {
        'x-access-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMTQ0ODMxNGQtOGY3Zi00N2VkLWEwZjgtZTFkMjdhODNjNGEzIiwiaWF0IjoxNTUwMjQ1NTMyLCJleHAiOjE1NTgwMjE1MzJ9.ft7BF2lskLmoYyMWSuobGKHEYvV5hbNAIjMaGYHyuqk',
        ...headers
      }
    })
)
