import gql from 'graphql-tag'

import CommentNewReplyNotice from './CommentNewReplyNotice'

import { CommentCommentNotice as NoticeType } from './__generated__/CommentCommentNotice'

const CommentCommentNotice = ({ notice }: { notice: NoticeType }) => {
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
