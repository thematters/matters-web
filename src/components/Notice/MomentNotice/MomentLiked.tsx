import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { MomentLikedFragment, MomentState } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import MomentCard from '../MomentCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeMomentTitle from '../NoticeMomentTitle'

const MomentLiked = ({ notice }: { notice: MomentLikedFragment }) => {
  if (notice.moment.state === MomentState.Archived) {
    return (
      <NoticeDigest
        notice={notice}
        action={
          <FormattedMessage
            defaultMessage="liked your deleted moment"
            description="src/components/Notice/MomentNotice/MomentLiked.tsx"
            id="5RPoaZ"
          />
        }
        testId={TEST_ID.NOTICE_MOMENT_LIKED}
      />
    )
  }

  return (
    <NoticeCard
      notice={notice}
      type="like"
      action={
        <FormattedMessage defaultMessage="liked your moment" id="/5OvMK" />
      }
      content={<MomentCard moment={notice.moment} />}
    />
  )
}

MomentLiked.fragments = {
  notice: gql`
    fragment MomentLiked on MomentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      moment: target {
        id
        ...NoticeMomentTitle
        ...MomentCardMoment
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeDate.fragments.notice}
    ${NoticeMomentTitle.fragments.moment}
    ${MomentCard.fragments.moment}
  `,
}

export default MomentLiked
