import gql from 'graphql-tag'

export const REMOVE_SOCIAL_LOGIN = gql`
  mutation RemoveSocialLogin($input: RemoveSocialLoginInput!) {
    removeSocialLogin(input: $input) {
      id
      info {
        socialAccounts {
          type
          userName
          email
        }
      }
    }
  }
`
