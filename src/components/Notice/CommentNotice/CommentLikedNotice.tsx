import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CommentNoticeFragment } from '~/gql/graphql'

import NoticeComment from '../NoticeComment'
import NoticeDigest from '../NoticeDigest'
import NoticeLiked from '../NoticeLiked'

const CommentLikedNotice = ({ notice }: { notice: CommentNoticeFragment }) => {
  if (!notice.actors) {
    return null
  }
  const commentLiked =
    notice.comment?.node.__typename === 'Article'
      ? notice.comment.node
      : undefined

  return (
    <NoticeDigest
      notice={notice}
      action={<FormattedMessage defaultMessage="liked" id="TvKqBp" />}
      title={
        commentLiked?.__typename === 'Article' ? (
          <NoticeLiked article={commentLiked} />
        ) : undefined
      }
      content={<NoticeComment comment={notice.comment} />}
      testId={TEST_ID.NOTICE_COMMENT_LIKED}
    />
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
            ...NoticeLiked
          }
        }
      }
    }
    ${NoticeLiked.fragments.article}
    ${NoticeComment.fragments.comment}
    ${NoticeDigest.fragments.notice}
  `,
}

export default CommentLikedNotice
