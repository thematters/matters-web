import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CircleNewUserNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import NoticeUserCard from '../NoticeUserCard'
import styles from '../styles.css'

type CircleNewUserNotice = {
  notice: CircleNewUserNoticeFragment
  userType: 'follower' | 'subscriber' | 'unsubscriber'
}

const CircleNewUserNotice = ({ notice, userType }: CircleNewUserNotice) => {
  if (!notice.actors) {
    return null
  }

  const isNewFollower = userType === 'follower'
  const isNewSubscriber = userType === 'subscriber'
  const isNewUnsubscriber = userType === 'unsubscriber'
  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  return (
    <section
      className="container"
      data-test-id={
        isNewFollower
          ? TEST_ID.CIRCLE_NEW_FOLLOWER
          : isNewSubscriber
          ? TEST_ID.CIRCLE_NEW_SUBSCRIBER
          : TEST_ID.CIRCLE_NEW_UNSUBSCRIBER
      }
    >
      <section className="avatar-wrap">
        <NoticeTypeIcon type="circle" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeHeadActors actors={notice.actors} />

          {isNewFollower && (
            <FormattedMessage
              defaultMessage="followed your circle"
              description="src/components/Notice/CircleNotice/CircleNewUserNotice.tsx"
            />
          )}
          {isNewSubscriber && (
            <FormattedMessage
              defaultMessage="subscribed your circle"
              description="src/components/Notice/CircleNotice/CircleNewUserNotice.tsx"
            />
          )}
          {isNewUnsubscriber && (
            <FormattedMessage
              defaultMessage="unsubscribed your circle"
              description="src/components/Notice/CircleNotice/CircleNewUserNotice.tsx"
            />
          )}
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

CircleNewUserNotice.fragments = {
  notice: gql`
    fragment CircleNewUserNotice on CircleNotice {
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

export default CircleNewUserNotice
