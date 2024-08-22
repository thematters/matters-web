import gql from 'graphql-tag'

import { CommentFeed } from '~/components/Comment/Feed'

export const COMMENT_DETAIL = gql`
  query CommentDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        ...CommentFeedCommentPublic
        ...CommentFeedCommentPrivate
        comments(input: { sort: oldest, first: null }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...CommentFeedCommentPublic
              ...CommentFeedCommentPrivate
            }
          }
        }
      }
    }
  }
  ${CommentFeed.fragments.comment.public}
  ${CommentFeed.fragments.comment.private}
`
