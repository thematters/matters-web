import gql from 'graphql-tag'

import commentFragments from '~/components/GQL/fragments/comment'

export default gql`
  query CommentComments($id: ID!, $hasDescendantComments: Boolean = true) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        comments(input: { sort: oldest, first: null })
          @include(if: $hasDescendantComments) {
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
  ${commentFragments.base}
`
