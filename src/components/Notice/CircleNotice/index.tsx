import gql from 'graphql-tag'

import { CircleNotice as NoticeType } from './__generated__/CircleNotice'

const CircleNotice = ({ notice }: { notice: NoticeType }) => {
  switch (notice.circleNoticeType) {
    case 'CircleNewFollower':
      return <span>CircleNewFollower</span>
    case 'CircleNewSubscriber':
      return <span>CircleNewSubscriber</span>
    case 'CircleNewUnsubscriber':
      return <span>CircleNewUnsubscriber</span>
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
    }
  `,
}

export default CircleNotice
