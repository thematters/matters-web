import gql from 'graphql-tag'

export default gql`
  mutation ToggleFollowTag($id: ID!, $enabled: Boolean) {
    toggleFollowTag(input: { id: $id, enabled: $enabled }) {
      id
      isFollower
    }
  }
`
