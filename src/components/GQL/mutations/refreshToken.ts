import gql from 'graphql-tag'

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      auth
      accessToken
      refreshToken
      type
      user {
        id
        settings {
          language
        }
        info {
          group
        }
      }
    }
  }
`
