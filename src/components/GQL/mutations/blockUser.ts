import { gql } from '@apollo/client'

export default gql`
  mutation BlockUser($id: ID!) {
    blockUser(input: { id: $id }) {
      id
      isBlocked
    }
  }
`
