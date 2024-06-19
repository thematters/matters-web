import gql from 'graphql-tag'

import { ArticleCommentFeed } from '~/components/ArticleComment/Feed'

export const COMMENT_DETAIL = gql`
  query CommentDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        ...ArticleFeedCommentPublic
        ...ArticleFeedCommentPrivate
        comments(input: { sort: oldest, first: null }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...ArticleFeedCommentPublic
              ...ArticleFeedCommentPrivate
            }
          }
        }
      }
    }
  }
  ${ArticleCommentFeed.fragments.comment.public}
  ${ArticleCommentFeed.fragments.comment.private}
`
