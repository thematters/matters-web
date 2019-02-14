import ApolloClient, { InMemoryCache } from 'apollo-boost'
import withApollo from 'next-with-apollo'

const env: string = process.env.NODE_ENV || 'development'

const config: { [key: string]: any } = {
  development: {
    apiUri: 'http://localhost:4000/'
  },
  production: {
    apiUri: 'https://server-stage.matters.news/'
  }
}

// let token = ''
// if (process.browser) {
//   token =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxIiwiaWF0IjoxNTUwMTA1MDY2LCJleHAiOjE1NTc4ODEwNjZ9.ILi4Cx6PHVzPzUrXds7P8QclTGjGEU2TlgsO80pwyw8' // localStorage.getItem('token') || token
// }

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: config[env].apiUri,
      cache: new InMemoryCache().restore(initialState || {}),
      headers
    })
)
