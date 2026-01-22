import gql from 'graphql-tag'

import { CommentNoticeFragment } from '~/gql/graphql'

import ArticleNewComment from './ArticleNewComment'
import CircleNewBroadcast from './CircleNewBroadcast'
import CommentLiked from './CommentLiked'
import CommentMentionedYou from './CommentMentionedYou'
import CommentPinnedNotice from './CommentPinnedNotice'
import MomentNewComment from './MomentNewComment'

const CommentNotice = ({ notice }: { notice: CommentNoticeFragment }) => {
  switch (notice.commentNoticeType) {
    case 'CommentMentionedYou':
      return <CommentMentionedYou notice={notice} />
    case 'CommentPinned':
      return <CommentPinnedNotice notice={notice} />
    case 'ArticleNewComment':
      return <ArticleNewComment notice={notice} />
    case 'CircleNewBroadcast':
      return <CircleNewBroadcast notice={notice} />
    case 'CommentLiked':
      return <CommentLiked notice={notice} />
    case 'MomentNewComment':
      return <MomentNewComment notice={notice} />
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
      ...CommentMentionedYou
      ...CommentPinnedNotice
      ...ArticleNewComment
      ...CircleNewBroadcast
      ...CommentLiked
      ...MomentNewComment
    }
    ${CommentMentionedYou.fragments.notice}
    ${CommentPinnedNotice.fragments.notice}
    ${ArticleNewComment.fragments.notice}
    ${CircleNewBroadcast.fragments.notice}
    ${CommentLiked.fragments.notice}
    ${MomentNewComment.fragments.notice}
  `,
}

export default CommentNotice
