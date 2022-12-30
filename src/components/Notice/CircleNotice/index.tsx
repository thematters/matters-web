import gql from 'graphql-tag'

import { CircleNotice as NoticeType } from './__generated__/CircleNotice'
import CircleInvitationNotice from './CircleInvitationNotice'
import CircleNewBroadcastComments from './CircleNewBroadcastComments'
import CircleNewDiscussionComments from './CircleNewDiscussionComments'
import CircleNewUserNotice from './CircleNewUserNotice'

const CircleNotice = ({ notice }: { notice: NoticeType }) => {
  switch (notice.circleNoticeType) {
    case 'CircleNewSubscriber':
      return <CircleNewUserNotice notice={notice} userType="subscriber" />
    case 'CircleNewFollower':
      return <CircleNewUserNotice notice={notice} userType="follower" />
    case 'CircleNewUnsubscriber':
      return <CircleNewUserNotice notice={notice} userType="unsubscriber" />
    case 'CircleInvitation':
      return <CircleInvitationNotice notice={notice} />
    case 'CircleNewBroadcastComments':
      return <CircleNewBroadcastComments notice={notice} />
    case 'CircleNewDiscussionComments':
      return <CircleNewDiscussionComments notice={notice} />
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
      ...CircleNewBroadcastComments
      ...CircleNewDiscussionComments
    }
    ${CircleNewUserNotice.fragments.notice}
    ${CircleInvitationNotice.fragments.notice}
    ${CircleNewBroadcastComments.fragments.notice}
    ${CircleNewDiscussionComments.fragments.notice}
  `,
}

export default CircleNotice
