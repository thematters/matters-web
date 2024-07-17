import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { CommentMentionedYouNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

const CommentMentionedYouNotice = ({
  notice,
}: {
  notice: CommentMentionedYouNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const commentArticle =
    notice.comment?.node.__typename === 'Article' ? notice.comment.node : null
  const commentCircle =
    notice.comment?.node.__typename === 'Circle' ? notice.comment.node : null
  const commentMoment =
    notice.comment?.type === 'moment' ? notice.comment.node : null

  const commentCircleDiscussion =
    notice.comment?.type === 'circleDiscussion' ? notice.comment.type : null
  const commentCircleBroadcast =
    notice.comment?.type === 'circleBroadcast' ? notice.comment.type : null

  const latestComment = notice.comment

  if (!latestComment) {
    return null
  }

  const circleCommentPath = toPath({
    page: 'commentDetail',
    comment: latestComment,
    article: commentArticle,
    circle: commentCircle,
  })

  return (
    <>
      {commentMoment && (
        <NoticeDigest
          notice={notice}
          action={
            <FormattedMessage
              defaultMessage="mentioned you in a moment comment"
              id="/kdFi6"
              description="src/components/Notice/CommentNotice/CommentMentionedYouNotice.tsx"
              values={{
                commentArticle: <NoticeArticleTitle article={commentArticle} />,
              }}
            />
          }
          // TODO: also added deleted comments
          content={<NoticeComment comment={notice.comment} />}
          testId={TEST_ID.NOTICE_COMMENT_MENTIONED_YOU}
        />
      )}
      {commentArticle && (
        <NoticeDigest
          notice={notice}
          action={
            <FormattedMessage
              defaultMessage="mentioned you in a comment at {commentArticle}"
              id="1zVIWy"
              description="src/components/Notice/CommentNotice/CommentMentionedYouNotice.tsx"
              values={{
                commentArticle: <NoticeArticleTitle article={commentArticle} />,
              }}
            />
          }
          content={<NoticeComment comment={notice.comment} />}
          testId={TEST_ID.NOTICE_COMMENT_MENTIONED_YOU}
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
                    path={circleCommentPath}
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

CommentMentionedYouNotice.fragments = {
  notice: gql`
    fragment CommentMentionedYouNotice on CommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      comment: target {
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

export default CommentMentionedYouNotice
