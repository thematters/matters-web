import gql from 'graphql-tag'

import { ArticleDigest, Comment } from '~/components'

export const ArticleDetailResponses = gql`
  fragment ArticleDetailResponses on Article {
    id
    responseCount
    responses(
      input: {
        after: $after
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
            ...DescendantsIncludedComment
          }
        }
      }
    }
  }
  ${ArticleDigest.Response.fragments.response}
  ${Comment.fragments.descendantsIncluded}
`
