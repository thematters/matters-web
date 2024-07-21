import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { MomentNewCommentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

const MomentNewCommentNotice = ({
  notice,
}: {
  notice: MomentNewCommentNoticeFragment
}) => {
  if (!notice.actors) {
    return null
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
      title={notice.comment?.content || 'FIXME title'}
      testId={TEST_ID.NOTICE_ARTICLE_NEW_COMMENT}
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
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default MomentNewCommentNotice
