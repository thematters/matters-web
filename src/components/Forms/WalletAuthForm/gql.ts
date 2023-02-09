import gql from 'graphql-tag'

export const GENERATE_SIGNING_MESSAGE = gql`
  mutation GenerateSigningMessage($input: GenerateSigningMessageInput!) {
    generateSigningMessage(input: $input) {
      nonce
      signingMessage
      createdAt
      expiredAt
    }
  }
`

export const WALLET_LOGIN = gql`
  mutation WalletLogin($input: WalletLoginInput!) {
    walletLogin(input: $input) {
      token
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

export const ETH_ADDRESS_USER = gql`
  query ETHAddressUser($ethAddress: String) {
    user(input: { ethAddress: $ethAddress }) {
      id
    }
  }
`
