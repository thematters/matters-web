import { gql } from '@apollo/client'

export default gql`
  mutation UnblockUser($id: ID!) {
    unblockUser(input: { id: $id }) {
      id
      isBlocked
    }
  }
`
