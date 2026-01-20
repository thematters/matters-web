import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { CircleNewInvitationFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'

const CircleNewInvitation = ({
  notice,
}: {
  notice: CircleNewInvitationFragment
}) => {
  if (!notice.circle) {
    return null
  }

  return (
    <NoticeCard
      notice={notice}
      type="circle"
      action={
        <FormattedMessage
          defaultMessage="invites you to join the circle {circleName}"
          description="src/components/Notice/CircleNotice/CircleInvitationNotice.tsx"
          id="fAhR69"
          values={{
            circleName: <NoticeCircleName circle={notice.circle} />,
          }}
        />
      }
    />
  )
}

CircleNewInvitation.fragments = {
  notice: gql`
    fragment CircleNewInvitation on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      circle: target {
        id
        invitedBy {
          id
          freePeriod
        }
        ...NoticeCircleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewInvitation
