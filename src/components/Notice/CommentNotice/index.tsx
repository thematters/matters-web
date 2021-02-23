import gql from 'graphql-tag'

import ArticleNewCommentNotice from './ArticleNewCommentNotice'
import CommentMentionedYouNotice from './CommentMentionedYouNotice'
import CommentPinnedNotice from './CommentPinnedNotice'
import SubscribedArticleNewCommentNotice from './SubscribedArticleNewCommentNotice'

import { CommentNotice as NoticeType } from './__generated__/CommentNotice'

const CommentNotice = ({ notice }: { notice: NoticeType }) => {
  switch (notice.commentNoticeType) {
    case 'ArticleNewComment':
      return <ArticleNewCommentNotice notice={notice} />
    case 'ArticleCommentMentionedYou':
      return <CommentMentionedYouNotice notice={notice} />
    case 'ArticleCommentPinned':
      return <CommentPinnedNotice notice={notice} />
    case 'SubscribedArticleNewComment':
      return <SubscribedArticleNewCommentNotice notice={notice} />
    case 'CircleNewBroadcast':
      return <span>CircleNewBroadcast</span>
    case 'CircleNewDiscussion':
      return <span>CircleNewDiscussion</span>
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
      ...ArticleNewCommentNotice
      ...CommentMentionedYouNotice
      ...CommentPinnedNotice
      ...SubscribedArticleNewCommentNotice
    }
    ${ArticleNewCommentNotice.fragments.notice}
    ${CommentMentionedYouNotice.fragments.notice}
    ${CommentPinnedNotice.fragments.notice}
    ${SubscribedArticleNewCommentNotice.fragments.notice}
  `,
}

export default CommentNotice
