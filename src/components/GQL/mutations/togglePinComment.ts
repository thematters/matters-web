import { gql } from '@apollo/client'

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
        ... on Circle {
          id
        }
      }
    }
  }
`
