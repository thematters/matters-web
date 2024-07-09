import gql from 'graphql-tag'

import { CommentNoticeFragment } from '~/gql/graphql'

import Comment from './Comment'
import CommentMention from './CommentMention'
import Like from './Like'
import LikeComment from './LikeComment'
import Mention from './Mention'

const MomentNotice = ({ notice }: { notice: CommentNoticeFragment }) => {
  switch (notice.commentNoticeType) {
    case 'CommentMentionedYou':
      return <CommentMention notice={notice} />
    case 'MomentNewComment':
      return <Comment notice={notice} />
    case 'ArticleNewComment':
      return <LikeComment notice={notice} />
    case 'CircleNewBroadcast':
      return <Like notice={notice} />
    case 'CommentLiked':
      return <Mention notice={notice} />
    default:
      return null
  }
}

MomentNotice.fragments = {
  notice: gql`
    fragment CommentNotice on CommentNotice {
      id
      unread
      __typename
      commentNoticeType: type
      ...Comment
      ...CommentMention
      ...LikeComment
      ...Like
      ...Mention
    }
    ${Comment.fragments.notice}
    ${CommentMention.fragments.notice}
    ${LikeComment.fragments.notice}
    ${Like.fragments.notice}
    ${Mention.fragments.notice}
  `,
}

export default MomentNotice
