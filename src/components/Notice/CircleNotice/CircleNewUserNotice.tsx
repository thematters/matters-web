import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { Translate } from '~/components'
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
            <Translate
              zh_hant="追蹤了你的圍爐"
              zh_hans="追踪了你的围炉"
              en=" followed your cirlce"
            />
          )}
          {isNewSubscriber && (
            <Translate
              zh_hant="訂閱了你的圍爐"
              zh_hans="订阅了你的围炉"
              en=" subscribed your cirlce"
            />
          )}
          {isNewUnsubscriber && (
            <Translate
              zh_hant="退訂了你的圍爐"
              zh_hans="退订了你的围炉"
              en=" unsubscribed your cirlce"
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
