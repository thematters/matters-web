import { gql } from '@apollo/client'
import { Fragment } from 'react'

import { Translate } from '~/components'

import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeFollower from './NoticeFollower'
import NoticeHead from './NoticeHead'
import NoticeTypeIcon from './NoticeTypeIcon'
import styles from './styles.css'

import { UserNewFollowerNotice as NoticeType } from './__generated__/UserNewFollowerNotice'

const UserNewFollowerNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="user" />
      </section>

      <section className="content-wrap">
        <NoticeHead hasDate={!isMultiActors} notice={notice}>
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
            />
          )}
          <Translate id="followingYou" />
        </NoticeHead>

        {isMultiActors ? (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} />
            ))}
          </section>
        ) : (
          <NoticeFollower user={notice.actors[0]} />
        )}
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

UserNewFollowerNotice.fragments = {
  notice: gql`
    fragment UserNewFollowerNotice on UserNewFollowerNotice {
      id
      unread
      __typename
      ...NoticeHead
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
        ...NoticeFollower
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeFollower.fragments.follower}
    ${NoticeHead.fragments.date}
  `,
}

export default UserNewFollowerNotice
