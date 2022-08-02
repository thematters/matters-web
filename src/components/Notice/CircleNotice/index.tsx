import gql from 'graphql-tag'

import CircleCommentNotice from './CircleCommentNotice'
import CircleInvitationNotice from './CircleInvitationNotice'
import CircleNewUserNotice from './CircleNewUserNotice'

import { CircleNotice as NoticeType } from './__generated__/CircleNotice'

const CircleNotice = ({ notice }: { notice: NoticeType }) => {
  console.log(notice.circleNoticeType)
  switch (notice.circleNoticeType) {
    case 'CircleNewSubscriber':
      return <CircleNewUserNotice notice={notice} userType="subscriber" />
    case 'CircleNewFollower':
      return <CircleNewUserNotice notice={notice} userType="follower" />
    case 'CircleNewUnsubscriber':
      return <CircleNewUserNotice notice={notice} userType="unsubscriber" />
    case 'CircleInvitation':
      return <CircleInvitationNotice notice={notice} />
    case 'CircleNewDiscussion':
      return (
        <CircleCommentNotice notice={notice} noticeType="circleNewDiscussion" />
      )
    case 'CircleNewBroadcast':
      return (
        <CircleCommentNotice notice={notice} noticeType="circleNewBroadcast" />
      )
    case 'CircleMemberBroadcast':
      return (
        <CircleCommentNotice
          notice={notice}
          noticeType="circleMemberBroadcast"
        />
      )
    case 'CircleMemberNewDiscussion':
      return (
        <CircleCommentNotice
          notice={notice}
          noticeType="circleMemberNewDiscussion"
        />
      )
    case 'CircleMemberNewDiscussionReply':
      return (
        <CircleCommentNotice
          notice={notice}
          noticeType="circleMemberNewDiscussionReply"
        />
      )
    case 'CircleMemberNewBroadcastReply':
      return (
        <CircleCommentNotice
          notice={notice}
          noticeType="circleMemberNewBroadcastReply"
        />
      )
    case 'InCircleNewArticle':
      return (
        <CircleCommentNotice notice={notice} noticeType="inCircleNewArticle" />
      )
    case 'InCircleNewBroadcast':
      return (
        <CircleCommentNotice
          notice={notice}
          noticeType="inCircleNewBroadcast"
        />
      )
    case 'InCircleNewBroadcastReply':
      return (
        <CircleCommentNotice
          notice={notice}
          noticeType="inCircleNewBroadcastReply"
        />
      )
    case 'InCircleNewDiscussion':
      return (
        <CircleCommentNotice
          notice={notice}
          noticeType="inCircleNewDiscussion"
        />
      )
    case 'InCircleNewDiscussionReply':
      return (
        <CircleCommentNotice
          notice={notice}
          noticeType="inCircleNewDiscussionReply"
        />
      )
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
      ...CircleCommentNotice
    }
    ${CircleNewUserNotice.fragments.notice}
    ${CircleInvitationNotice.fragments.notice}
    ${CircleCommentNotice.fragments.notice}
  `,
}

export default CircleNotice
