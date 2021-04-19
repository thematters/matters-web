import { gql } from '@apollo/client'

export default gql`
  mutation ToggleFollowUser($id: ID!, $enabled: Boolean) {
    toggleFollowUser(input: { id: $id, enabled: $enabled }) {
      id
      isFollowee
      isFollower
    }
  }
`
