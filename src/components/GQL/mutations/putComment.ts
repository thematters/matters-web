import gql from 'graphql-tag'

import { CommentFeed, CommentThreadComment } from '~/components/Comment'

export const PUT_ARTICLE_COMMENT = gql`
  mutation PutArticleComment($input: PutCommentInput!) {
    putComment(input: $input) {
      ...CommentThreadCommentCommentPublic
      ...CommentThreadCommentCommentPrivate
    }
  }
  ${CommentThreadComment.fragments.comment.public}
  ${CommentThreadComment.fragments.comment.private}
`

export const PUT_MOMENT_COMMENT = gql`
  mutation PutMomentComment($input: PutCommentInput!) {
    putComment(input: $input) {
      id
      ...CommentFeedCommentPublic
      ...CommentFeedCommentPrivate
    }
  }
  ${CommentFeed.fragments.comment.public}
  ${CommentFeed.fragments.comment.private}
`

export const PUT_CIRCLE_COMMENT = gql`
  mutation PutCircleComment($input: PutCommentInput!) {
    putComment(input: $input) {
      id
      content
    }
  }
`
