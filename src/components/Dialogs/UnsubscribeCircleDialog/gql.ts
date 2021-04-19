import { gql } from '@apollo/client'

export const UNSUBSCRIBE_CIRCLE = gql`
  mutation UnsubscribeCircle($id: ID!) {
    unsubscribeCircle(input: { id: $id }) {
      id
      isMember
    }
  }
`
