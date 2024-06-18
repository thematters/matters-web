import gql from 'graphql-tag'

import { ArticleThreadComment } from '~/components/ArticleComment'

export const PUT_ARTICLE_COMMENT = gql`
  mutation PutArticleComment($input: PutCommentInput!) {
    putComment(input: $input) {
      ...ArticleThreadCommentCommentPublic
      ...ArticleThreadCommentCommentPrivate
    }
  }
  ${ArticleThreadComment.fragments.comment.public}
  ${ArticleThreadComment.fragments.comment.private}
`

export const PUT_CIRCLE_COMMENT = gql`
  mutation PutCircleComment($input: PutCommentInput!) {
    putComment(input: $input) {
      id
      content
    }
  }
`
