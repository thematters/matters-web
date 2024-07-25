import gql from 'graphql-tag'

import { CommentNoticeFragment } from '~/gql/graphql'

import ArticleNewCommentNotice from './ArticleNewCommentNotice'
import CircleNewBroadcastNotice from './CircleNewBroadcastNotice'
import CommentMentionedYouNotice from './CommentMentionedYouNotice'
import CommentPinnedNotice from './CommentPinnedNotice'
import MomentNewCommentNotice from './MomentNewCommentNotice'

const CommentNotice = ({ notice }: { notice: CommentNoticeFragment }) => {
  switch (notice.commentNoticeType) {
    case 'CommentMentionedYou':
      return <CommentMentionedYouNotice notice={notice} />
    case 'CommentPinned':
      return <CommentPinnedNotice notice={notice} />
    case 'ArticleNewComment':
      return <ArticleNewCommentNotice notice={notice} />
    case 'MomentNewComment':
      return <MomentNewCommentNotice notice={notice} />
    case 'CircleNewBroadcast':
      return <CircleNewBroadcastNotice notice={notice} />
    default:
      return null
  }
}

CommentNotice.fragments = {
  notice: gql`
    fragment CommentNotice on CommentNotice {
      id
      unread
      __typename
      commentNoticeType: type
      ...CommentMentionedYouNotice
      ...CommentPinnedNotice
      ...ArticleNewCommentNotice
      ...CircleNewBroadcastNotice
      ...MomentNewCommentNotice
    }
    ${CommentMentionedYouNotice.fragments.notice}
    ${CommentPinnedNotice.fragments.notice}
    ${ArticleNewCommentNotice.fragments.notice}
    ${MomentNewCommentNotice.fragments.notice}
    ${CircleNewBroadcastNotice.fragments.notice}
  `,
}

export default CommentNotice
