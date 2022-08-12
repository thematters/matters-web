import gql from 'graphql-tag'

import InCircleNewBroadcastNotice from './InCircleNewBroadcastNotice'

import { CircleCommentNotice as NoticeType } from './__generated__/CircleCommentNotice'

const CircleCommentNotice = ({ notice }: { notice: NoticeType }) => {
  switch (notice.circleCommentNoticeType) {
    case 'InCircleNewBroadcast':
      return <InCircleNewBroadcastNotice notice={notice} />
    default:
      return null
  }
}

CircleCommentNotice.fragments = {
  notice: gql`
    fragment CircleCommentNotice on CircleCommentNotice {
      id
      unread
      __typename
      circleCommentNoticeType: type
      ...InCircleNewBroadcastNotice
    }
    ${InCircleNewBroadcastNotice.fragments.notice}
  `,
}

export default CircleCommentNotice
