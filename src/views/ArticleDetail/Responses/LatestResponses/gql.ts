import gql from 'graphql-tag'

import ResponseArticle from '../ResponseArticle'
import ResponseComment from '../ResponseComment'

export const LATEST_RESPONSES_PUBLIC = gql`
  query LatestResponsesPublic(
    $mediaHash: String
    $before: String
    $after: String
    $first: Int = 8
    $includeAfter: Boolean
    $includeBefore: Boolean
    $articleOnly: Boolean
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      mediaHash
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
              ...ResponseArticleArticle
            }
            ... on Comment {
              ...ResponseCommentCommentPublic
              ...ResponseCommentCommentPrivate
            }
          }
        }
      }
    }
  }
  ${ResponseArticle.fragments.article}
  ${ResponseComment.fragments.comment.public}
  ${ResponseComment.fragments.comment.private}
`

export const LATEST_RESPONSES_PRIVATE = gql`
  query LatestResponsesPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...ResponseCommentCommentPrivate
      }
    }
  }
  ${ResponseComment.fragments.comment.private}
`
