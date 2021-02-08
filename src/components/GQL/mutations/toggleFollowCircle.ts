import gql from 'graphql-tag'

export default gql`
  mutation ToggleFollowCircle($id: ID!, $enabled: Boolean) {
    toggleFollowCircle(input: { id: $id, enabled: $enabled }) {
      id
      isFollower
    }
  }
`
