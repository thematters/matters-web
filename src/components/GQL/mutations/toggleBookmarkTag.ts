import gql from 'graphql-tag'

export default gql`
  mutation ToggleBookmarkTag($id: ID!, $enabled: Boolean) {
    toggleBookmarkTag(input: { id: $id, enabled: $enabled }) {
      id
      isFollower
    }
  }
`
