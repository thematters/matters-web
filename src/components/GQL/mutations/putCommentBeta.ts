import gql from 'graphql-tag'

import { ThreadCommentBeta } from '~/components/CommentBeta'

export default gql`
  mutation PutCommentBeta($input: PutCommentInput!) {
    putComment(input: $input) {
      ...ThreadCommentCommentBetaPublic
      ...ThreadCommentCommentBetaPrivate
    }
  }
  ${ThreadCommentBeta.fragments.comment.public}
  ${ThreadCommentBeta.fragments.comment.private}
`
