import { gql } from '@apollo/client'
import { Fragment } from 'react'

import { Translate } from '~/components'

import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import NoticeUserCard from '../NoticeUserCard'
import styles from '../styles.css'

import { CircleNewUserNotice as NoticeType } from './__generated__/CircleNewUserNotice'

type CircleNewUserNotice = {
  notice: NoticeType
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
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="circle" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          {notice.actors.slice(0, 2).map((actor, index) => (
            <Fragment key={index}>
              <NoticeActorName user={actor} />
              {isMultiActors && index < 1 && <span>、</span>}
            </Fragment>
          ))}{' '}
          {isMultiActors && (
            <Translate
              zh_hant={`等 ${numAbbr(actorsCount)} 人`}
              zh_hans={`等 ${numAbbr(actorsCount)} 人`}
              en={`etc. ${numAbbr(actorsCount)} users`}
            />
          )}
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
        ...NoticeActorNameUser
        ...NoticeUserCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeUserCard.fragments.follower}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewUserNotice
