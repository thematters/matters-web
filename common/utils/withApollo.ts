import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import withApollo from 'next-with-apollo'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API_URL }
} = getConfig()

const httpLink = ({ headers }: { [key: string]: any }) =>
  createHttpLink({
    uri: API_URL,
    // credentials: 'include',
    headers: {
      'x-access-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMTQ0ODMxNGQtOGY3Zi00N2VkLWEwZjgtZTFkMjdhODNjNGEzIiwiaWF0IjoxNTUwOTMyMjY0LCJleHAiOjE1NTg3MDgyNjR9.XsxV4iaVTC8zndEBY3KwP_Jnoyo9wfDSYcJMhZW9gXc',
      ...headers
    }
  })

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link: httpLink({ headers }),
      cache: new InMemoryCache().restore(initialState || {})
    })
)
