import gql from 'graphql-tag'

export const SUBSCRIBE_CIRCLE = gql`
  mutation SubscribeCircle($input: SubscribeCircleInput!) {
    subscribeCircle(input: $input) {
      client_secret
    }
  }
`
