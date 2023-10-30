import gql from 'graphql-tag'

export const OAUTH_REQUEST_TOKEN = gql`
  query OauthRequestToken {
    oauthRequestToken
  }
`
