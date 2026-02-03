import gql from 'graphql-tag'

import { CircleNoticeFragment } from '~/gql/graphql'

import CircleNewBroadcastComments from './CircleNewBroadcastComments'
import CircleNewDiscussionComments from './CircleNewDiscussionComments'
import CircleNewInvitation from './CircleNewInvitation'
import CircleNewUser from './CircleNewUser'

const CircleNotice = ({ notice }: { notice: CircleNoticeFragment }) => {
  switch (notice.circleNoticeType) {
    case 'CircleNewSubscriber':
      return <CircleNewUser notice={notice} userType="subscriber" />
    case 'CircleNewFollower':
      return <CircleNewUser notice={notice} userType="follower" />
    case 'CircleNewUnsubscriber':
      return <CircleNewUser notice={notice} userType="unsubscriber" />
    case 'CircleInvitation':
      return <CircleNewInvitation notice={notice} />
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
      ...CircleNewUser
      ...CircleNewInvitation
      ...CircleNewBroadcastComments
      ...CircleNewDiscussionComments
    }
    ${CircleNewUser.fragments.notice}
    ${CircleNewInvitation.fragments.notice}
    ${CircleNewBroadcastComments.fragments.notice}
    ${CircleNewDiscussionComments.fragments.notice}
  `,
}

export default CircleNotice
