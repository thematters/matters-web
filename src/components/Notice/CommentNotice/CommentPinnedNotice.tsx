import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CommentPinnedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'

const CommentPinnedNotice = ({
  notice,
}: {
  notice: CommentPinnedNoticeFragment
}) => {
  const commentArticle =
    notice.comment?.node.__typename === 'Article'
      ? notice.comment.node
      : undefined

  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="pinned your comment in {commentArticle}"
          id="cAP9g5"
          description="src/components/Notice/CommentNotice/CommentPinnedNotice.tsx"
          values={{
            commentArticle: commentArticle && (
              <NoticeArticleTitle article={commentArticle} />
            ),
          }}
        />
      }
      content={<NoticeComment comment={notice.comment} />}
      testId={TEST_ID.NOTICE_COMMENT_PINNED}
    />
  )
}

CommentPinnedNotice.fragments = {
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
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CommentPinnedNotice
