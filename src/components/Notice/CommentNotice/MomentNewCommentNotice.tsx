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

  // const commentMoment =
  //   notice.comment?.node.__typename === 'Moment'
  //     ? notice.comment.node
  //     : undefined
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="commented in you moment"
          id="znsO4a"
          description="src/components/Notice/CommentNotice/MomentNewCommentNotice.tsx"
        />
      }
      content={<NoticeComment comment={notice.comment} />}
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
