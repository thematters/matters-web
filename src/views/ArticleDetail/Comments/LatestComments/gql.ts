import gql from 'graphql-tag'

import { ThreadCommentBeta } from '~/components'

export const LATEST_COMMENTS_PUBLIC = gql`
  query LatestCommentsPublic(
    $id: ID!
    $before: String
    $after: String
    $first: first_Int_min_0 = 8
    $includeAfter: Boolean
    $includeBefore: Boolean
  ) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        shortHash
        id
        pinnedComments {
          ... on Comment {
            ...ThreadCommentCommentBetaPublic
            ...ThreadCommentCommentBetaPrivate
          }
        }
        comments(
          input: {
            sort: newest
            after: $after
            before: $before
            first: $first
            includeAfter: $includeAfter
            includeBefore: $includeBefore
            filter: { parentComment: null }
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
              ... on Comment {
                ...ThreadCommentCommentBetaPublic
                ...ThreadCommentCommentBetaPrivate
              }
            }
          }
        }
      }
    }
  }
  ${ThreadCommentBeta.fragments.comment.public}
  ${ThreadCommentBeta.fragments.comment.private}
`

export const LATEST_COMMENTS_PRIVATE = gql`
  query LatestCommentsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...ThreadCommentCommentBetaPrivate
      }
    }
  }
  ${ThreadCommentBeta.fragments.comment.private}
`
