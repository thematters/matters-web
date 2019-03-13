import gql from 'graphql-tag'

import commentFragments from '../fragments/comment'

export default gql`
  query ArticleComments(
    $mediaHash: String
    $uuid: UUID
    $cursor: String
    $hasDescendantComments: Boolean = true
  ) {
    article(input: { mediaHash: $mediaHash, uuid: $uuid }) {
      id
      mediaHash
      pinnedComments {
        ...FeedDigestComment
      }
      comments(input: { parent: true, first: 10, after: $cursor }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...FeedDigestComment
          }
        }
      }
    }
  }
  ${commentFragments.feed}
`
