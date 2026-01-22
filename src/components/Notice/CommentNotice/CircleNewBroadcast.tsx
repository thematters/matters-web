import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { CircleNewBroadcastFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import CommentCard from '../CommentCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'

const CircleNewBroadcast = ({
  notice,
}: {
  notice: CircleNewBroadcastFragment
}) => {
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
    <NoticeCard
      notice={notice}
      type="circle"
      action={
        <FormattedMessage
          defaultMessage="broadcast in {circlename}"
          id="jy3tx0"
          values={{
            circlename: commentCircle && (
              <NoticeCircleName
                circle={commentCircle || null}
                path={circleCommentPath}
              />
            ),
          }}
          description="src/components/Notice/CommentNotice/CircleNewBroadcastNotice.tsx"
        />
      }
      content={<CommentCard comment={notice.comment} line={3} />}
    />
  )
}

CircleNewBroadcast.fragments = {
  notice: gql`
    fragment CircleNewBroadcast on CommentNotice {
      id
      commentNoticeType: type
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      comment: target {
        ...NoticeComment
        ...CommentCardComment
        node {
          ... on Circle {
            ...NoticeCircleName
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeCircleName.fragments.circle}
    ${NoticeComment.fragments.comment}
    ${CommentCard.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewBroadcast
