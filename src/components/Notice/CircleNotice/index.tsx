import gql from 'graphql-tag'

import CircleNewUserNotice from './CircleNewUserNotice'

import { CircleNotice as NoticeType } from './__generated__/CircleNotice'

const CircleNotice = ({ notice }: { notice: NoticeType }) => {
  switch (notice.circleNoticeType) {
    case 'CircleNewFollower':
      return <CircleNewUserNotice notice={notice} userType="follower" />
    case 'CircleNewSubscriber':
      return <CircleNewUserNotice notice={notice} userType="subscriber" />
    case 'CircleNewUnsubscriber':
      return <CircleNewUserNotice notice={notice} userType="unsubscriber" />
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
    }
    ${CircleNewUserNotice.fragments.notice}
  `,
}

export default CircleNotice
