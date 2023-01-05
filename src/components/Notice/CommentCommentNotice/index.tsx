import gql from 'graphql-tag'

import { CommentCommentNoticeFragment } from '~/gql/graphql'

import CommentNewReplyNotice from './CommentNewReplyNotice'

const CommentCommentNotice = ({
  notice,
}: {
  notice: CommentCommentNoticeFragment
}) => {
  switch (notice.commentCommentNoticeType) {
    case 'CommentNewReply':
      return <CommentNewReplyNotice notice={notice} />
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
      ...CommentNewReplyNotice
    }
    ${CommentNewReplyNotice.fragments.notice}
  `,
}

export default CommentCommentNotice
