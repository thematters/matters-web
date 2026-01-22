import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { CommentMentionedYouFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import ArticleCard from '../ArticleCard'
import CommentCard from '../CommentCard'
import MomentCard from '../MomentCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCard from '../NoticeCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeMomentTitle from '../NoticeMomentTitle'

const CommentMentionedYou = ({
  notice,
}: {
  notice: CommentMentionedYouFragment
}) => {
  const commentArticle =
    notice.comment?.node.__typename === 'Article' ? notice.comment.node : null
  const commentCircle =
    notice.comment?.node.__typename === 'Circle' ? notice.comment.node : null
  const commentMoment =
    notice.comment?.node.__typename === 'Moment' ? notice.comment.node : null

  const commentCircleDiscussion =
    notice.comment?.type === 'circleDiscussion' ? notice.comment.type : null
  const commentCircleBroadcast =
    notice.comment?.type === 'circleBroadcast' ? notice.comment.type : null

  const latestComment = notice.comment

  if (!latestComment) {
    return null
  }

  return (
    <>
      {commentMoment && (
        <NoticeCard
          notice={notice}
          type="comment"
          action={
            <FormattedMessage
              defaultMessage="mentioned you in a comment"
              description="src/components/Notice/CommentNotice/CommentMentionedYouNotice.tsx"
              id="CZJdSn"
            />
          }
          content={
            <>
              <MomentCard moment={commentMoment} />
              <CommentCard comment={notice.comment} color="black" />
            </>
          }
        />
      )}
      {commentArticle && (
        <NoticeCard
          notice={notice}
          type="comment"
          action={
            <FormattedMessage
              defaultMessage="mentioned you"
              id="v2dMFZ"
              description="src/components/Notice/CommentNotice/CommentMentionedYouNotice.tsx"
            />
          }
          content={
            <>
              <ArticleCard article={commentArticle} />
              <CommentCard comment={notice.comment} />
            </>
          }
        />
      )}
      {commentCircle && (
        <NoticeDigest
          notice={notice}
          action={
            <FormattedMessage
              defaultMessage="commented in {commentCircle}"
              id="BHFHeY"
              description="src/components/Notice/CommentNotice/CommentMentionedYouNotice.tsx"
              values={{
                commentCircle: (
                  <NoticeCircleName
                    circle={commentCircle}
                    path={toPath({
                      page: 'commentDetail',
                      comment: latestComment,
                      article: commentArticle,
                      circle: commentCircle,
                    })}
                  />
                ),
              }}
            />
          }
          secondAction={
            commentCircleDiscussion ? (
              <FormattedMessage
                defaultMessage="discussion and mentioned you"
                id="yZfKI4"
                description="src/components/Notice/CommentNotice/CommentMentionedYouNotice.tsx"
              />
            ) : commentCircleBroadcast ? (
              <FormattedMessage
                defaultMessage="broadcast and mentioned you"
                id="Xz/AHp"
                description="src/components/Notice/CommentNotice/CommentMentionedYouNotice.tsx"
              />
            ) : undefined
          }
          content={<NoticeComment comment={notice.comment} />}
          testId={TEST_ID.NOTICE_COMMENT_MENTIONED_YOU}
        />
      )}
    </>
  )
}

CommentMentionedYou.fragments = {
  notice: gql`
    fragment CommentMentionedYou on CommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      comment: target {
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
          ... on Moment {
            state
            ...NoticeMomentTitle
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
    ${NoticeMomentTitle.fragments.moment}
  `,
}

export default CommentMentionedYou
