import { gql } from '@apollo/client'

export const SUBSCRIBE_CIRCLE = gql`
  mutation SubscribeCircle($input: SubscribeCircleInput!) {
    subscribeCircle(input: $input) {
      circle {
        id
        isMember
      }
      client_secret
    }
  }
`

export const WALLET_PAYMENT_METHOD = gql`
  query WalletPaymentMethod {
    viewer {
      id
      wallet {
        cardLast4
      }
    }
  }
`
