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
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const CommentMentionedYouNotice = ({
  notice,
}: {
  notice: CommentMentionedYouNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  const commentArticle =
    notice.comment?.node.__typename === 'Article' ? notice.comment.node : null
  const commentCircle =
    notice.comment?.node.__typename === 'Circle' ? notice.comment.node : null

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
    <section className="container" data-test-id={TEST_ID.COMMENT_MENTIONED_YOU}>
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="comment" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeHeadActors actors={notice.actors} />

          {commentArticle && (
            <>
              <FormattedMessage
                defaultMessage="mentioned you in a comment on {commentArticle}"
                description="src/components/Notice/CommentNotice/CommentMentionedYouNotice.tsx"
                values={{
                  commentArticle: (
                    <NoticeArticleTitle article={commentArticle} />
                  ),
                }}
              />
            </>
          )}
          {commentCircle && (
            <>
              <FormattedMessage
                defaultMessage="commented in {commentCircle}"
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
              {commentCircleDiscussion && (
                <FormattedMessage
                  defaultMessage="discussion and mentioned you"
                  description="src/components/Notice/CommentNotice/CommentMentionedYouNotice.tsx"
                />
              )}
              {commentCircleBroadcast && (
                <FormattedMessage
                  defaultMessage="broadcast and mentioned you"
                  description="src/components/Notice/CommentNotice/CommentMentionedYouNotice.tsx"
                />
              )}
            </>
          )}
        </NoticeHead>

        <NoticeComment comment={notice.comment} />

        {isMultiActors && (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} size="md" />
            ))}
          </section>
        )}

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
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
