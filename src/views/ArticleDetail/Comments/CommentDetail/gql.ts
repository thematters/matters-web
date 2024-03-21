import gql from 'graphql-tag'

import CommentFeed from '~/components/CommentBeta/Feed'

export const COMMENT_DETAIL = gql`
  query CommentDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        ...FeedCommentBetaPublic
        ...FeedCommentBetaPrivate
        comments(input: { sort: oldest, first: null }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...FeedCommentBetaPublic
              ...FeedCommentBetaPrivate
            }
          }
        }
      }
    }
  }
  ${CommentFeed.fragments.comment.public}
  ${CommentFeed.fragments.comment.private}
`
