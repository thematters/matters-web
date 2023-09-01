import gql from 'graphql-tag'

export const SOCIAL_LOGIN = gql`
  mutation SocialLogin($input: SocialLoginInput!) {
    socialLogin(input: $input) {
      auth
      token
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