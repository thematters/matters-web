import { gql } from '@apollo/client'

export default gql`
  mutation ToggleFollowTag($id: ID!, $enabled: Boolean) {
    toggleFollowTag(input: { id: $id, enabled: $enabled }) {
      id
      isFollower
    }
  }
`
