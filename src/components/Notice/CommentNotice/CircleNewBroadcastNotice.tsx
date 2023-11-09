import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { CircleNewBroadcastNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

const CircleNewBroadcastNotice = ({
  notice,
}: {
  notice: CircleNewBroadcastNoticeFragment
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
    <NoticeDigest
      notice={notice}
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
      testId={TEST_ID.NOTICE_CIRCLE_NEW_BROADCAST}
      content={<NoticeComment comment={notice.comment} />}
    />
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
