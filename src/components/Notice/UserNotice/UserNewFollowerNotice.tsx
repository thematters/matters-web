import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { UserNewFollowerNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import NoticeUserCard from '../NoticeUserCard'
import styles from '../styles.css'

const UserNewFollowerNotice = ({
  notice,
}: {
  notice: UserNewFollowerNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  return (
    <section
      className="container"
      data-test-id={TEST_ID.NOTICE_USER_NEW_FOLLOWER}
    >
      <section className="avatar-wrap">
        <NoticeTypeIcon type="user" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeHeadActors actors={notice.actors} />
          <FormattedMessage
            defaultMessage="followed you"
            description="src/components/Notice/UserNotice/UserNewFollowerNotice.tsx"
          />
        </NoticeHead>

        {isMultiActors ? (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} size="md" />
            ))}
          </section>
        ) : (
          <NoticeUserCard user={notice.actors[0]} />
        )}

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

UserNewFollowerNotice.fragments = {
  notice: gql`
    fragment UserNewFollowerNotice on UserNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
        ...NoticeUserCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeUserCard.fragments.follower}
    ${NoticeDate.fragments.notice}
  `,
}

export default UserNewFollowerNotice
