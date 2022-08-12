import gql from 'graphql-tag'

import CircleBroadcastMentionedYouNotice from './CircleBroadcastMentionedYouNotice'
import CircleDiscussionMentionedYouNotice from './CircleDiscussionMentionedYouNotice'
import CircleInvitationNotice from './CircleInvitationNotice'
import CircleNewUserNotice from './CircleNewUserNotice'
import CircleReplyNotice from './CircleReplyNotice'

import { CircleNotice as NoticeType } from './__generated__/CircleNotice'

const CircleNotice = ({ notice }: { notice: NoticeType }) => {
  console.log('CircleNotice -> ' + notice.circleNoticeType)
  switch (notice.circleNoticeType) {
    case 'CircleNewSubscriber':
      return <CircleNewUserNotice notice={notice} userType="subscriber" />
    case 'CircleNewFollower':
      return <CircleNewUserNotice notice={notice} userType="follower" />
    case 'CircleNewUnsubscriber':
      return <CircleNewUserNotice notice={notice} userType="unsubscriber" />
    case 'CircleInvitation':
      return <CircleInvitationNotice notice={notice} />

    case 'CircleMemberNewBroadcastReply':
      return (
        <CircleReplyNotice
          notice={notice}
          noticeType="circleMemberNewBroadcastReply"
        />
      )
    case 'CircleMemberNewDiscussion':
      return (
        <CircleReplyNotice
          notice={notice}
          noticeType="circleMemberNewDiscussion"
        />
      )
    case 'CircleMemberNewDiscussionReply':
      return (
        <CircleReplyNotice
          notice={notice}
          noticeType="circleMemberNewDiscussionReply"
        />
      )
    case 'InCircleNewBroadcastReply':
      return (
        <CircleReplyNotice
          notice={notice}
          noticeType="inCircleNewBroadcastReply"
        />
      )
    case 'InCircleNewDiscussion':
      return (
        <CircleReplyNotice notice={notice} noticeType="inCircleNewDiscussion" />
      )
    case 'InCircleNewDiscussionReply':
      return (
        <CircleReplyNotice
          notice={notice}
          noticeType="inCircleNewDiscussionReply"
        />
      )
    case 'CircleBroadcastMentionedYou':
      return <CircleBroadcastMentionedYouNotice notice={notice} />
    case 'CircleDiscussionMentionedYou':
      return <CircleDiscussionMentionedYouNotice notice={notice} />
    default:
      return null
  }
}

CircleNotice.fragments = {
  notice: gql`
    fragment CircleNotice on CircleNotice {
      id
      unread
      __typename
      circleNoticeType: type
      ...CircleNewUserNotice
      ...CircleInvitationNotice
      ...CircleReplyNotice
      ...CircleBroadcastMentionedYouNotice
      ...CircleDiscussionMentionedYouNotice
    }
    ${CircleNewUserNotice.fragments.notice}
    ${CircleInvitationNotice.fragments.notice}
    ${CircleReplyNotice.fragments.notice}
    ${CircleBroadcastMentionedYouNotice.fragments.notice}
    ${CircleDiscussionMentionedYouNotice.fragments.notice}
  `,
}

export default CircleNotice
