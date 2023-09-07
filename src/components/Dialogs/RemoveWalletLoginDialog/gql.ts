import gql from 'graphql-tag'

export const REMOVE_WALLET_LOGIN = gql`
  mutation RemoveWalletLogin {
    removeWalletLogin {
      id
    }
  }
`
