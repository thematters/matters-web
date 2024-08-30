import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { MomentNewCommentNoticeFragment, MomentState } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMomentTitle from '../NoticeMomentTitle'

const MomentNewCommentNotice = ({
  notice,
}: {
  notice: MomentNewCommentNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const commentMoment =
    notice.comment?.node.__typename === 'Moment'
      ? notice.comment.node
      : undefined

  if (commentMoment?.state === MomentState.Archived) {
    return (
      <NoticeDigest
        notice={notice}
        action={
          <FormattedMessage
            defaultMessage="commented on a deleted moment"
            description="src/components/Notice/CommentNotice/MomentNewCommentNotice.tsx"
            id="E0xjVb"
          />
        }
        content={<NoticeComment comment={notice.comment} />}
        testId={TEST_ID.NOTICE_MOMENT_NEW_COMMENT}
      />
    )
  }

  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="commented in your moment"
          id="qCotH5"
          description="src/components/Notice/CommentNotice/MomentNewCommentNotice.tsx"
        />
      }
      title={commentMoment && <NoticeMomentTitle moment={commentMoment} />}
      content={<NoticeComment comment={notice.comment} />}
      testId={TEST_ID.NOTICE_MOMENT_NEW_COMMENT}
    />
  )
}

MomentNewCommentNotice.fragments = {
  notice: gql`
    fragment MomentNewCommentNotice on CommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      comment: target {
        ...NoticeComment
        node {
          ... on Moment {
            ...NoticeMomentTitle
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
    ${NoticeMomentTitle.fragments.moment}
  `,
}

export default MomentNewCommentNotice
