import gql from 'graphql-tag'

export default gql`
  mutation TogglePinComment($id: ID!, $enabled: Boolean) {
    togglePinComment(input: { id: $id, enabled: $enabled }) {
      id
      pinned
      node {
        ... on Article {
          id
          pinCommentLeft
        }
      }
    }
  }
`
