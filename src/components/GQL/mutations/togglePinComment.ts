import gql from 'graphql-tag'

export const TOGGLE_ARTICLE_PIN_COMMENT = gql`
  mutation ToggleArticlePinComment($id: ID!, $enabled: Boolean) {
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

export const TOGGLE_CIRCLE_PIN_COMMENT = gql`
  mutation ToggleCirclePinComment($id: ID!, $enabled: Boolean) {
    togglePinComment(input: { id: $id, enabled: $enabled }) {
      id
      pinned
      node {
        ... on Circle {
          id
        }
      }
    }
  }
`
