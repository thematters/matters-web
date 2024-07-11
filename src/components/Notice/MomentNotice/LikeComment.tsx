// 2. {user} liked one of your comments in a moment
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { CommentMentionedYouNoticeFragment } from '~/gql/graphql'

// import NoticeActorName from '../NoticeActorName'
import NoticeComment from '../NoticeComment'
import NoticeDigest from '../NoticeDigest'

// 3. {user} commented under your moment
const LikeComment = ({
  notice,
}: {
  notice: CommentMentionedYouNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="liked your moment comment"
          id="Jaxf/L"
        />
      }
      content={<NoticeComment comment={notice.comment} />}
      // testId={TEST_ID.NOTICE_COMMENT_MENTION}
    />
  )
}

LikeComment.fragments = {
  notice: gql`
    fragment LikeMomentCommentNotice on CommentNotice {
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

export default LikeComment
