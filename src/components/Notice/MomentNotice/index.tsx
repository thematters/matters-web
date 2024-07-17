import gql from 'graphql-tag'

import { MomentNoticeFragment } from '~/gql/graphql'

import Like from './Like'

const MomentNotice = ({ notice }: { notice: MomentNoticeFragment }) => {
  switch (notice.momentNoticeType) {
    case 'MomentLiked':
      return <Like notice={notice} />
    default:
      return null
  }
}

MomentNotice.fragments = {
  notice: gql`
    fragment MomentNotice on MomentNotice {
      id
      unread
      __typename
      momentNoticeType: type
      ...LikeMomentNotice
    }
    ${Like.fragments.notice}
  `,
}

export default MomentNotice
