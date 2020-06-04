import gql from 'graphql-tag'

import ResponseArticle from '../ResponseArticle'
import ResponseComment from '../ResponseComment'

const LatestResponsesArticlePublic = gql`
  fragment LatestResponsesArticlePublic on Article {
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
        includePrivate: $includePrivate
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
          }
        }
      }
    }
  }
  ${ResponseArticle.fragments.article}
  ${ResponseComment.fragments.comment.public}
`

export const LATEST_RESPONSES_PUBLIC = gql`
  query LatestResponsesPublic(
    $mediaHash: String
    $before: String
    $after: String
    $first: Int = 8
    $includeAfter: Boolean
    $includeBefore: Boolean
    $articleOnly: Boolean
    $includePrivate: Boolean
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      mediaHash
      live
      ...LatestResponsesArticlePublic
    }
  }
  ${LatestResponsesArticlePublic}
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

export const SUBSCRIBE_RESPONSE_ADDED = gql`
  subscription ResponseAdded(
    $id: ID!
    $before: String
    $after: String
    $first: Int
    $includeAfter: Boolean
    $includeBefore: Boolean
    $articleOnly: Boolean
  ) {
    nodeEdited(input: { id: $id }) {
      id
      ... on Article {
        id
        ...LatestResponsesArticlePublic
      }
    }
  }
  ${LatestResponsesArticlePublic}
`
