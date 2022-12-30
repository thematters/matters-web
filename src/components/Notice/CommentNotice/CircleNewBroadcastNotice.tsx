import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'
import { CircleNewBroadcastNotice as NoticeType } from './__generated__/CircleNewBroadcastNotice'

const CircleNewBroadcastNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1
  const commentCircle =
    notice.comment?.node.__typename === 'Circle'
      ? notice.comment.node
      : undefined

  const latestComment = notice.comment

  if (!latestComment) {
    return null
  }

  const circleCommentPath = toPath({
    page: 'commentDetail',
    comment: latestComment,
    circle: commentCircle,
  })

  return (
    <section className="container" data-test-id={TEST_ID.CIRCLE_NEW_BROADCAST}>
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="comment" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeHeadActors actors={notice.actors} />

          <Translate
            zh_hant="在圍爐 "
            zh_hans="在围炉 "
            en={` sent a new broadcast on `}
          />
          {commentCircle && (
            <NoticeCircleName circle={commentCircle} path={circleCommentPath} />
          )}
          <Translate
            zh_hant={` 發布了新廣播`}
            zh_hans={` 发布了新广播`}
            en=""
          />
        </NoticeHead>

        {isMultiActors ? (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} size="md" />
            ))}
          </section>
        ) : (
          <NoticeComment comment={notice.comment} />
        )}

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CircleNewBroadcastNotice.fragments = {
  notice: gql`
    fragment CircleNewBroadcastNotice on CommentNotice {
      id
      commentNoticeType: type
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      comment: target {
        ...NoticeComment
        node {
          ... on Circle {
            ...NoticeCircleName
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeCircleName.fragments.circle}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewBroadcastNotice
