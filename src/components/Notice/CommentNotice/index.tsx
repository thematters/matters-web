import gql from 'graphql-tag'

import { CommentNoticeFragment } from '~/gql/graphql'

import ArticleNewCommentNotice from './ArticleNewCommentNotice'
import CircleNewBroadcastNotice from './CircleNewBroadcastNotice'
import CommentLikedNotice from './CommentLikedNotice'
import CommentMentionedYouNotice from './CommentMentionedYouNotice'
import CommentPinnedNotice from './CommentPinnedNotice'

const CommentNotice = ({ notice }: { notice: CommentNoticeFragment }) => {
  switch (notice.commentNoticeType) {
    case 'CommentMentionedYou':
      return <CommentMentionedYouNotice notice={notice} />
    case 'CommentPinned':
      return <CommentPinnedNotice notice={notice} />
    case 'ArticleNewComment':
      return <ArticleNewCommentNotice notice={notice} />
    case 'CircleNewBroadcast':
      return <CircleNewBroadcastNotice notice={notice} />
    case 'CommentLiked':
      return <CommentLikedNotice notice={notice} />
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
    }
    ${CommentMentionedYouNotice.fragments.notice}
    ${CommentPinnedNotice.fragments.notice}
    ${ArticleNewCommentNotice.fragments.notice}
    ${CircleNewBroadcastNotice.fragments.notice}
  `,
}

export default CommentNotice
