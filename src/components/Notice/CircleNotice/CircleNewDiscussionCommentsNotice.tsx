import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { ViewerContext } from '~/components'
import { CircleNewDiscussionCommentsFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

type CircleNewDiscussionCommentsNoticeType = {
  notice: CircleNewDiscussionCommentsFragment
}

const CircleNewDiscussionCommentsNotice = ({
  notice,
}: CircleNewDiscussionCommentsNoticeType) => {
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
      <NoticeDigest
        notice={notice}
        action={
          <>
            {(newDiscussionCount || replyCount) && !mentionCount && (
              <FormattedMessage
                defaultMessage="left a comment in your circle"
                id="6Vznnt"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
              />
            )}

            {(newDiscussionCount || replyCount) && mentionCount && (
              <FormattedMessage
                defaultMessage="left comments and mentioned you in your circle"
                id="V8msLJ"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
              />
            )}
          </>
        }
        testId={TEST_ID.NOTICE_CIRCLE_NEW_DISCUSSION_COMMENTS}
      />
    )
  }

  return (
    <NoticeDigest
      notice={notice}
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
      testId={TEST_ID.NOTICE_CIRCLE_NEW_DISCUSSION_COMMENTS}
    />
  )
}

CircleNewDiscussionCommentsNotice.fragments = {
  notice: gql`
    fragment CircleNewDiscussionCommentsNotice on CircleNotice {
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
        replyTo {
          author {
            id
          }
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

export default CircleNewDiscussionCommentsNotice
