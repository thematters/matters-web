import gql from 'graphql-tag'

import CommentFragments from '~/components/GQL/fragments/comment'

export default gql`
  query CommentComments($id: ID!, $hasDescendants: Boolean = true) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        comments(input: { sort: oldest, first: null })
          @include(if: $hasDescendants) {
          edges {
            cursor
            node {
              ...BaseDigestComment
            }
          }
        }
      }
    }
  }
  ${CommentFragments.base}
`
