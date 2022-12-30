import gql from 'graphql-tag'
import { useContext } from 'react'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Translate, ViewerContext } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
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
  const { comments, replies, mentions } = notice

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

  const latestComment = [
    ...(comments || []),
    ...(replies || []),
    ...(mentions || []),
  ].filter(Boolean)[0]
  const circleCommentPath = toPath({
    page: 'commentDetail',
    comment: latestComment,
    circle: notice.circle,
  })

  return (
    <section
      className="container"
      data-test-id={TEST_ID.CIRCLE_NEW_BROADCAST_COMMENTS}
    >
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="circle" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeHeadActors actors={notice.actors} />

          <>
            {isCircleOwner ? (
              <Translate
                zh_hant="在你的圍爐 "
                zh_hans="在你的围炉 "
                en=" commented in your circle "
              />
            ) : (
              <Translate
                zh_hant="在圍爐 "
                zh_hans="在围炉 "
                en=" commented in "
              />
            )}
            <NoticeCircleName circle={notice.circle} path={circleCommentPath} />
            {replyCount && !mentionCount && (
              <Translate
                zh_hant=" 廣播中留言 "
                zh_hans=" 广播中留言 "
                en=" Broadcast "
              />
            )}
            {!replyCount && mentionCount && (
              <Translate
                zh_hant=" 廣播中留言，其中有提及你 "
                zh_hans=" 广播中留言，其中有提及你 "
                en=" Broadcast and mentioned you "
              />
            )}
            {replyCount && mentionCount && (
              <Translate
                zh_hant=" 廣播中留言，其中有提及你 "
                zh_hans=" 广播中留言，其中有提及你 "
                en=" Broadcast and mentioned you "
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
        ...NoticeHeadActorsUser
      }
      circle: target {
        ...NoticeCircleCard
      }
      comments {
        id
        type
        parentComment {
          id
        }
      }
      replies {
        id
        type
        parentComment {
          id
        }
        author {
          id
        }
      }
      mentions {
        id
        type
        parentComment {
          id
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewBroadcastComments
