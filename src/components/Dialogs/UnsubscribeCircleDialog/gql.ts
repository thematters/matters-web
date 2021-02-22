import gql from 'graphql-tag'

export const UNSUBSCRIBE_CIRCLE = gql`
  mutation UnsubscribeCircle($id: ID!) {
    unsubscribeCircle(input: { id: $id }) {
      id
      isMember
    }
  }
`
