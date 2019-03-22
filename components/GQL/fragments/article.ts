import gql from 'graphql-tag'

import commentFragments from './comment'

export const ArticleDetailComments = gql`
  fragment ArticleDetailComments on Article {
    id
    pinnedComments {
      ...FeedDigestComment
    }
    comments(input: { parent: true, first: $first, after: $cursor }) {
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
  ${commentFragments.feed}
`
