import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CircleInvitationNoticeFragment } from '~/gql/graphql'

import NoticeActorName from '../NoticeActorName'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'

const CircleInvitationNotice = ({
  notice,
}: {
  notice: CircleInvitationNoticeFragment
}) => {
  if (!notice.actors || !notice.circle) {
    return null
  }

  const circle = notice.circle

  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="invites you to join the circle {circleName} , and you can experience it for {freePeriod} days for free"
          id="ItUuuX"
          description="src/components/Notice/CircleNotice/CircleInvitationNotice.tsx"
          values={{
            circleName: <NoticeCircleName circle={notice.circle} />,
            freePeriod: circle?.invitedBy?.freePeriod,
          }}
        />
      }
      testId={TEST_ID.NOTICE_CIRCLE_INVITATION}
    />
  )
}

CircleInvitationNotice.fragments = {
  notice: gql`
    fragment CircleInvitationNotice on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorNameUser
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
    ${NoticeActorName.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleInvitationNotice
