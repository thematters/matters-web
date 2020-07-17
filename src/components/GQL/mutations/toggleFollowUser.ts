import gql from 'graphql-tag'

export default gql`
  mutation ToggleFollowUser($id: ID!, $enabled: Boolean) {
    toggleFollowUser(input: { id: $id, enabled: $enabled }) {
      id
      isFollowee
      isFollower
    }
  }
`
