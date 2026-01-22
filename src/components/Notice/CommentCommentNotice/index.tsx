import gql from 'graphql-tag'

import { CommentCommentNoticeFragment } from '~/gql/graphql'

import CommentNewReply from './CommentNewReply'

const CommentCommentNotice = ({
  notice,
}: {
  notice: CommentCommentNoticeFragment
}) => {
  switch (notice.commentCommentNoticeType) {
    case 'CommentNewReply':
      return <CommentNewReply notice={notice} />
    default:
      return null
  }
}

CommentCommentNotice.fragments = {
  notice: gql`
    fragment CommentCommentNotice on CommentCommentNotice {
      id
      unread
      __typename
      commentCommentNoticeType: type
      ...CommentNewReply
    }
    ${CommentNewReply.fragments.notice}
  `,
}

export default CommentCommentNotice
