import { gql } from '@apollo/client'

export default gql`
  mutation ToggleBlockUser($id: ID!, $enabled: Boolean) {
    toggleBlockUser(input: { id: $id, enabled: $enabled }) {
      id
      isBlocked
    }
  }
`
