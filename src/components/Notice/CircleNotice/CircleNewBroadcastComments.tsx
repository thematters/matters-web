import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { ViewerContext } from '~/components'
import { CircleNewBroadcastCommentsFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

type CircleNewBroadcastCommentsType = {
  notice: CircleNewBroadcastCommentsFragment
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
              <FormattedMessage
                defaultMessage="in your circle"
                description=""
              />
            ) : (
              <FormattedMessage defaultMessage="commented in" description="" />
            )}
            <NoticeCircleName circle={notice.circle} path={circleCommentPath} />
            {replyCount && !mentionCount && (
              <FormattedMessage
                defaultMessage=" commented in Broadcast"
                description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
              />
            )}
            {!replyCount && mentionCount && (
              <FormattedMessage
                defaultMessage="Broadcast and mentioned you in comment"
                description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
              />
            )}
            {replyCount && mentionCount && (
              <FormattedMessage
                defaultMessage="Broadcast and mentioned you in comment"
                description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
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
