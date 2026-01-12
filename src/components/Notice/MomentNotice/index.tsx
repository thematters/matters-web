import gql from 'graphql-tag'

import { MomentNoticeFragment } from '~/gql/graphql'

import MomentLiked from './MomentLiked'
import MomentMentionedYou from './MomentMentionedYou'

const MomentNotice = ({ notice }: { notice: MomentNoticeFragment }) => {
  switch (notice.momentNoticeType) {
    case 'MomentLiked':
      return <MomentLiked notice={notice} />
    case 'MomentMentionedYou':
      return <MomentMentionedYou notice={notice} />
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
      ...MomentLiked
      ...MomentMentionedYou
    }
    ${MomentLiked.fragments.notice}
    ${MomentMentionedYou.fragments.notice}
  `,
}

export default MomentNotice
