import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CircleInvitationNoticeFragment } from '~/gql/graphql'

import NoticeActorName from '../NoticeActorName'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const CircleInvitationNotice = ({
  notice,
}: {
  notice: CircleInvitationNoticeFragment
}) => {
  if (!notice.actors || !notice.circle) {
    return null
  }

  const circle = notice.circle
  const actor = notice.actors[0]

  return (
    <section className="container" data-test-id={TEST_ID.CIRCLE_INVITATION}>
      <section className="avatar-wrap">
        <NoticeTypeIcon type="circle" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <FormattedMessage
            defaultMessage="Congrats!"
            description="src/components/Notice/CircleNotice/CircleInvitationNotice.tsx"
          />
          <NoticeActorName user={actor} />
          <FormattedMessage
            defaultMessage="invites you to join Circle for"
            description="src/components/Notice/CircleNotice/CircleInvitationNotice.tsx"
          />
          {circle?.invitedBy?.freePeriod}
          <FormattedMessage
            defaultMessage="days for free. Try it and have fun!"
            description="src/components/Notice/CircleNotice/CircleInvitationNotice.tsx"
          />
        </NoticeHead>

        <NoticeCircleCard circle={circle} />
        <NoticeDate notice={notice} />
      </section>
      <style jsx>{styles}</style>
    </section>
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
