import gql from 'graphql-tag'
import { Fragment } from 'react'

import { Icon, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeFollower from './NoticeFollower'
import NoticeHead from './NoticeHead'
import styles from './styles.css'

import { UserNewFollowerNotice as NoticeType } from './__generated__/UserNewFollowerNotice'

const UserNewFollowerNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = notice.actors && actorsCount > 1

  return (
    <section className="container">
      <section className="avatar-wrap">
        <Icon.User color="green" size="lg" />
      </section>

      <section className="content-wrap">
        <NoticeHead hasDate={!isMultiActors} notice={notice}>
          {notice.actors.slice(0, 2).map((actor, index) => (
            <Fragment key={index}>
              <NoticeActorName user={actor} />
              {index < actorsCount - 1 && <span>、</span>}
            </Fragment>
          ))}{' '}
          {isMultiActors && (
            <Translate
              zh_hant={`等 ${numAbbr(actorsCount)} 人`}
              zh_hans={`等 ${numAbbr(actorsCount)} 人`}
            />
          )}
          <Translate
            zh_hant={TEXT.zh_hant.followingYou}
            zh_hans={TEXT.zh_hans.followingYou}
          />
        </NoticeHead>

        {isMultiActors ? (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <Fragment key={index}>
                <NoticeActorAvatar user={actor} />
              </Fragment>
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
  `
}

export default UserNewFollowerNotice
