import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { ViewerContext } from '~/components'
import { CircleNewBroadcastCommentsFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import CommentCard from '../CommentCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'

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

  // const actorsCount = notice.actors.length
  // const isMultiActors = actorsCount > 1

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

  if (isCircleOwner) {
    return (
      <NoticeCard
        notice={notice}
        type="circle"
        action={
          <>
            {replyCount && !mentionCount && (
              <FormattedMessage
                defaultMessage="commented in your circle broadcast"
                id="Y+spJC"
                description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
              />
            )}
            {replyCount && mentionCount && (
              <FormattedMessage
                defaultMessage="mentioned you in your circle broadcast comment"
                id="XQTBu6"
                description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
              />
            )}
          </>
        }
        content={<CommentCard comment={latestComment} line={3} />}
      />
    )
  }

  return (
    <NoticeCard
      notice={notice}
      type="circle"
      action={
        <>
          {replyCount && !mentionCount && (
            <FormattedMessage
              defaultMessage="commented broadcast in {circleName}"
              id="EZMrtJ"
              description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
              values={{
                circleName: (
                  <NoticeCircleName
                    circle={notice.circle}
                    path={circleCommentPath}
                  />
                ),
              }}
            />
          )}
          {replyCount && mentionCount && (
            <FormattedMessage
              defaultMessage="mentioned you in broadcast comment in {circleName}"
              id="r66dXx"
              description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
              values={{
                circleName: (
                  <NoticeCircleName
                    circle={notice.circle}
                    path={circleCommentPath}
                  />
                ),
              }}
            />
          )}
        </>
      }
      content={<CommentCard comment={latestComment} line={3} />}
    />
  )
}

CircleNewBroadcastComments.fragments = {
  notice: gql`
    fragment CircleNewBroadcastComments on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      circle: target {
        ...NoticeCircleCard
      }
      comments {
        id
        type
        content
        parentComment {
          id
        }
        ...CommentCardComment
      }
      replies {
        id
        type
        content
        parentComment {
          id
        }
        author {
          id
        }
        ...CommentCardComment
      }
      mentions {
        id
        type
        content
        parentComment {
          id
        }
        ...CommentCardComment
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${CommentCard.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewBroadcastComments
