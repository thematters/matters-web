import gql from 'graphql-tag'

import { ArticleDigest } from '~/components/ArticleDigest'

import commentFragments from './comment'

export const ArticleDetailResponses = gql`
  fragment ArticleDetailResponses on Article {
    id
    responseCount
    responses(
      input: {
        after: $cursor
        before: $before
        first: $first
        includeAfter: $includeAfter
        includeBefore: $includeBefore
        articleOnly: $articleOnly
      }
    ) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Article {
            ...ResponseDigestArticle
          }
          ... on Comment {
            ...FeedDigestComment
          }
        }
      }
    }
  }
  ${ArticleDigest.Response.fragments.response}
  ${commentFragments.feed}
`
