import gql from 'graphql-tag'

import { Translate } from '~/components'

import { TEST_ID } from '~/common/enums'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import NoticeUserCard from '../NoticeUserCard'
import styles from '../styles.css'

import { UserNewFollowerNotice as NoticeType } from './__generated__/UserNewFollowerNotice'

const UserNewFollowerNotice = ({ notice }: { notice: NoticeType }) => {
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

          <Translate zh_hant="追蹤了你" zh_hans="追踪了你" en=" Followed You" />
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
