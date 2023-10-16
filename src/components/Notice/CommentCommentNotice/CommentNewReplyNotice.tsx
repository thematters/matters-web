import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CommentNewReplyNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

const CommentNewReplyNotice = ({
  notice,
}: {
  notice: CommentNewReplyNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  const replyCommentArticle =
    notice.reply?.node.__typename === 'Article' ? notice.reply.node : null
  const replyCommentCircle =
    notice.reply?.node.__typename === 'Circle' ? notice.reply.node : null

  return (
    <>
      {replyCommentArticle && (
        <NoticeDigest
          notice={notice}
          action={
            <FormattedMessage
              defaultMessage="replied your comment in"
              id="nNB7KU"
              description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
            />
          }
          title={<NoticeArticleTitle article={replyCommentArticle} />}
          secondAction={
            <FormattedMessage
              defaultMessage="comment"
              id="ZUPQzl"
              description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
            />
          }
          content={
            <NoticeComment
              comment={isMultiActors ? notice.comment : notice.reply}
            />
          }
          testId={TEST_ID.NOTICE_COMMENT_NEW_REPLY}
        />
      )}
      {replyCommentCircle && (
        <NoticeDigest
          notice={notice}
          action={
            <FormattedMessage
              defaultMessage=" replied to your discussion on"
              id="8rMZWb"
              description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
            />
          }
          title={<NoticeArticleTitle article={replyCommentArticle} />}
          secondAction={
            <FormattedMessage
              defaultMessage="comment_circle"
              id="aaUBvF"
              description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
            />
          }
          content={
            <NoticeComment
              comment={isMultiActors ? notice.comment : notice.reply}
            />
          }
          testId={TEST_ID.NOTICE_COMMENT_NEW_REPLY}
        />
      )}
    </>
  )
}
CommentNewReplyNotice.fragments = {
  notice: gql`
    fragment CommentNewReplyNotice on CommentCommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      comment: target {
        ...NoticeComment
      }
      reply: comment {
        ...NoticeComment
        node {
          ... on Article {
            ...NoticeArticleTitle
          }
          ... on Circle {
            ...NoticeCircleName
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeCircleName.fragments.circle}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CommentNewReplyNotice
