// 3. {user} commented under your moment
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { CommentMentionedYouNoticeFragment } from '~/gql/graphql'

// import NoticeActorName from '../NoticeActorName'
import NoticeComment from '../NoticeComment'
import NoticeDigest from '../NoticeDigest'

// 3. {user} commented under your moment
const Comment = ({ notice }: { notice: CommentMentionedYouNoticeFragment }) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="{user} commented under your moment"
          id="3PKS5m"
        />
      }
      content={<NoticeComment comment={notice.comment} />}
      // testId={TEST_ID.NOTICE_COMMENT_MENTION}
    />
  )
}

Comment.fragments = {
  notice: gql`
    fragment CommentPinnedNotice on CommentNotice {
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

export default Comment
