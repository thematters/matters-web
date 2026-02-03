import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { MomentMentionedYouFragment, MomentState } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import MomentCard from '../MomentCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeMomentTitle from '../NoticeMomentTitle'

const MomentMentionedYou = ({
  notice,
}: {
  notice: MomentMentionedYouFragment
}) => {
  const moment = notice.moment

  if (moment.state === MomentState.Archived) {
    return (
      <NoticeDigest
        notice={notice}
        action={
          <FormattedMessage
            defaultMessage="mentioned you in a deleted moment "
            description="src/components/Notice/MomentNotice/MomentMentionedYou.tsx"
            id="Upe8I6"
          />
        }
        testId={TEST_ID.NOTICE_MOMENT_MENTIONED}
      />
    )
  }

  return (
    <NoticeCard
      notice={notice}
      type="comment"
      action={
        <FormattedMessage
          defaultMessage="mentioned you in a moment"
          id="oKcye/"
        />
      }
      content={<MomentCard moment={notice.moment} />}
    />
  )
}

MomentMentionedYou.fragments = {
  notice: gql`
    fragment MomentMentionedYou on MomentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      moment: target {
        id
        state
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

export default MomentMentionedYou
