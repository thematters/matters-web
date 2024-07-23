import gql from 'graphql-tag'

import { MomentNoticeFragment } from '~/gql/graphql'

import Like from './Like'
import Mention from './Mention'

const MomentNotice = ({ notice }: { notice: MomentNoticeFragment }) => {
  switch (notice.momentNoticeType) {
    case 'MomentLiked':
      return <Like notice={notice} />
    case 'MomentMentionedYou':
      return <Mention notice={notice} />
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
      ...MentionMomentNotice
    }
    ${Like.fragments.notice}
    ${Mention.fragments.notice}
  `,
}

export default MomentNotice
