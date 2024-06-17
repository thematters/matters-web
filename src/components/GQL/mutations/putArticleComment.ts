import gql from 'graphql-tag'

import { ArticleThreadComment } from '~/components/ArticleComment'

export default gql`
  mutation PutArticleComment($input: PutCommentInput!) {
    putComment(input: $input) {
      ...ArticleThreadCommentCommentPublic
      ...ArticleThreadCommentCommentPrivate
    }
  }
  ${ArticleThreadComment.fragments.comment.public}
  ${ArticleThreadComment.fragments.comment.private}
`
