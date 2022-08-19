import gql from 'graphql-tag'
import { Fragment, useContext } from 'react'

import { Translate, ViewerContext } from '~/components'

import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CircleNewBroadcastComments as NoticeType } from './__generated__/CircleNewBroadcastComments'

type CircleNewBroadcastCommentsType = {
  notice: NoticeType
}

const CircleNewBroadcastComments = ({
  notice,
}: CircleNewBroadcastCommentsType) => {
  const viewer = useContext(ViewerContext)
  const { replies, mentions } = notice

  if (!notice.actors) {
    return null
  }

  const isCircleOwner = notice.circle.owner.id === viewer.id
  const replyCount = replies?.length
  const mentionCount = mentions?.length

  if (!replyCount && !mentionCount) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  return (
    <section className="container">
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="circle" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
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
          <>
            {isCircleOwner ? (
              <Translate
                zh_hant="在你的圍爐 "
                zh_hans="在你的围炉 "
                en=" in "
              />
            ) : (
              <Translate zh_hant="在圍爐 " zh_hans="在围炉 " en=" in " />
            )}
            <NoticeCircleName circle={notice.circle} />
            {replyCount && !mentionCount && (
              <Translate
                zh_hant=" 廣播中留言 "
                zh_hans=" 广播中留言 "
                en=" replied broadcasts "
              />
            )}
            {!replyCount && mentionCount && (
              <Translate
                zh_hant=" 廣播中留言，其中有提及你 "
                zh_hans=" 广播中留言，其中有提及你 "
                en=" replied broadcasts and mentioned you "
              />
            )}
            {replyCount && mentionCount && (
              <Translate
                zh_hant=" 廣播中留言，其中有提及你 "
                zh_hans=" 广播中留言，其中有提及你 "
                en=" replied broadcasts and mentioned you "
              />
            )}
          </>
          {isMultiActors && (
            <section className="multi-actor-avatars">
              {notice.actors.map((actor, index) => (
                <NoticeActorAvatar key={index} user={actor} size="md" />
              ))}
            </section>
          )}
        </NoticeHead>
        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CircleNewBroadcastComments.fragments = {
  notice: gql`
    fragment CircleNewBroadcastComments on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      circle: target {
        ...NoticeCircleCard
      }
      comments {
        id
      }
      replies {
        id
        author {
          id
        }
      }
      mentions {
        id
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewBroadcastComments
