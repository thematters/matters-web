import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { ViewerContext } from '~/components'
import { CircleNewDiscussionCommentsFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import CommentCard from '../CommentCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'

type CircleNewDiscussionCommentsType = {
  notice: CircleNewDiscussionCommentsFragment
}

const CircleNewDiscussionComments = ({
  notice,
}: CircleNewDiscussionCommentsType) => {
  const viewer = useContext(ViewerContext)
  const { comments, replies, mentions } = notice

  const isCircleOwner = notice.circle.owner.id === viewer.id
  const newDiscussionCount = comments?.length
  const replyCount = replies?.length
  const mentionCount = mentions?.length

  if (!newDiscussionCount && !replyCount && !mentionCount) {
    return null
  }

  const latestComment = [
    ...(comments || []),
    ...(replies || []),
    ...(mentions || []),
  ].filter(Boolean)[0]

  if (!latestComment) {
    return null
  }

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
            {(newDiscussionCount || replyCount) && !mentionCount && (
              <FormattedMessage
                defaultMessage="commented in your circle"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
                id="kSWA0M"
              />
            )}

            {(newDiscussionCount || replyCount) && mentionCount && (
              <FormattedMessage
                defaultMessage="mentioned you in your circle"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
                id="Xcz2mz"
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
          {(newDiscussionCount || replyCount) && !mentionCount && (
            <FormattedMessage
              defaultMessage="left a comment in {circleName}"
              id="zllCbU"
              description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
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
          {(newDiscussionCount || replyCount) && mentionCount && (
            <FormattedMessage
              defaultMessage="left a comment in {circleName} and mentioned you"
              id="wER32z"
              description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
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

CircleNewDiscussionComments.fragments = {
  notice: gql`
    fragment CircleNewDiscussionComments on CircleNotice {
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
        parentComment {
          id
        }
        ...CommentCardComment
      }
      replies {
        id
        type
        parentComment {
          id
        }
        replyTo {
          author {
            id
          }
        }
        ...CommentCardComment
      }
      mentions {
        id
        type
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

export default CircleNewDiscussionComments
