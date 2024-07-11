// 4. {user} mentioned you in a comment section of a Moment
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { CommentMentionedYouNoticeFragment } from '~/gql/graphql'

// import NoticeActorName from '../NoticeActorName'
import NoticeComment from '../NoticeComment'
import NoticeDigest from '../NoticeDigest'

// 3. {user} commented under your moment
const CommentMentionNotice = ({
  notice,
}: {
  notice: CommentMentionedYouNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="mentioned you in a moment comment"
          id="qKAW1a"
        />
      }
      content={<NoticeComment comment={notice.comment} />}
      // testId={TEST_ID.NOTICE_COMMENT_MENTION}
    />
  )
}

CommentMentionNotice.fragments = {
  notice: gql`
    fragment CommentMomentMentionNotice on CommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      comment: target {
        ...NoticeComment
        node {
          ... on Article {
            ...NoticeArticleTitle
          }
        }
      }
    }
  `,
}

export default CommentMentionNotice
