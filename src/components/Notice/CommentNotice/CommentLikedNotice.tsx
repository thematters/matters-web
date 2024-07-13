import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CommentLikedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

// this is for both moment and article
const CommentLikedNotice = ({
  notice,
}: {
  notice: CommentLikedNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }
  const commentArticle =
    notice.comment?.node?.__typename === 'Article' ? notice.comment.node : null
  const commentMoment =
    notice.comment?.type === 'moment' ? notice.comment : null

  return (
    <>
      {commentMoment && (
        <NoticeDigest
          notice={notice}
          action={
            <FormattedMessage
              defaultMessage="liked your moment comment"
              id="Jaxf/L"
            />
          }
          // TODO: add title={notice.comment?.content || 'FIXME title'}
          content={<NoticeComment comment={notice.comment} />}
          testId={TEST_ID.NOTICE_COMMENT_LIKED}
        />
      )}
      {commentArticle && (
        <NoticeDigest
          notice={notice}
          action={
            <FormattedMessage
              defaultMessage="liked your article comment"
              id="LG37gc"
            />
          }
          title={
            commentArticle.__typename === 'Article' ? (
              <NoticeArticleTitle article={commentArticle} />
            ) : undefined
          }
          content={<NoticeComment comment={notice.comment} />}
          testId={TEST_ID.NOTICE_COMMENT_LIKED}
        />
      )}
    </>
  )
}

CommentLikedNotice.fragments = {
  notice: gql`
    fragment CommentLikedNotice on CommentNotice {
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
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CommentLikedNotice
