import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CommentNewReplyFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import ArticleCard from '../ArticleCard'
import CommentCard from '../CommentCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCard from '../NoticeCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'

const CommentNewReply = ({ notice }: { notice: CommentNewReplyFragment }) => {
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
        <NoticeCard
          notice={notice}
          type="comment"
          action={
            <FormattedMessage
              defaultMessage="replied you"
              id="jOgBV9"
              description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
            />
          }
          content={
            <>
              <ArticleCard article={replyCommentArticle} />
              <CommentCard
                comment={notice.comment}
                color="grey"
                hasBorder={true}
              />
              <CommentCard comment={notice.reply} />
            </>
          }
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
CommentNewReply.fragments = {
  notice: gql`
    fragment CommentNewReply on CommentCommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      comment: target {
        ...NoticeComment
        ...CommentCardComment
      }
      reply: comment {
        ...NoticeComment
        ...CommentCardComment
        node {
          ... on Article {
            ...NoticeArticleTitle
            ...ArticleCardArticle
          }
          ... on Circle {
            ...NoticeCircleName
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${ArticleCard.fragments.article}
    ${NoticeCircleName.fragments.circle}
    ${NoticeComment.fragments.comment}
    ${CommentCard.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CommentNewReply
