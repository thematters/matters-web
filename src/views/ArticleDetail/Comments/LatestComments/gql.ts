import gql from 'graphql-tag'

import { CommentThreadComment } from '~/components'

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
            ...CommentThreadCommentCommentPublic
            ...CommentThreadCommentCommentPrivate
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
                ...CommentThreadCommentCommentPublic
                ...CommentThreadCommentCommentPrivate
              }
            }
          }
        }
      }
    }
  }
  ${CommentThreadComment.fragments.comment.public}
  ${CommentThreadComment.fragments.comment.private}
`

export const LATEST_COMMENTS_PRIVATE = gql`
  query LatestCommentsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...CommentThreadCommentCommentPrivate
      }
    }
  }
  ${CommentThreadComment.fragments.comment.private}
`
