import ApolloClient, { InMemoryCache } from 'apollo-boost'
import withApollo from 'next-with-apollo'

const env: string = process.env.NODE_ENV || 'development'

const config: { [key: string]: any } = {
  development: {
    apiUri: 'http://matters-server-develop.ap-southeast-1.elasticbeanstalk.com/'
  },
  production: {
    apiUri: 'https://server-stage.matters.news/'
  }
}

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: config[env].apiUri,
      cache: new InMemoryCache().restore(initialState || {}),
      headers
    })
)
