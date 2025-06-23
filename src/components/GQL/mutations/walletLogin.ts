import gql from 'graphql-tag'

export const WALLET_LOGIN = gql`
  mutation WalletLogin($input: WalletLoginInput!) {
    walletLogin(input: $input) {
      accessToken
      refreshToken
      auth
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

export const ADD_WALLET_LOGIN = gql`
  mutation AddWalletLogin($input: WalletLoginInput!) {
    addWalletLogin(input: $input) {
      id
      info {
        ethAddress
      }
    }
  }
`
