import gql from 'graphql-tag'

export const GENERATE_SIGNING_MESSAGE = gql`
  mutation GenerateSigningMessage($address: String!) {
    generateSigningMessage(address: $address) {
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
