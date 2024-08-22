import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CommentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMomentTitle from '../NoticeMomentTitle'

const CommentLikedNotice = ({ notice }: { notice: CommentNoticeFragment }) => {
  if (!notice.actors) {
    return null
  }

  const isMoment = notice.comment.node.__typename === 'Moment'
  const commentMoment =
    notice.comment.node.__typename === 'Moment'
      ? notice.comment.node
      : undefined

  return (
    <NoticeDigest
      notice={notice}
      action={
        isMoment ? (
          <FormattedMessage
            defaultMessage="liked your comment"
            id="rsdUz2"
            description="MOMENT"
          />
        ) : (
          <FormattedMessage defaultMessage="liked your comment" id="ZNK0I9" />
        )
      }
      title={commentMoment && <NoticeMomentTitle moment={commentMoment} />}
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
            ...NoticeArticleTitle
          }
          ... on Moment {
            ...NoticeMomentTitle
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeComment.fragments.comment}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeDate.fragments.notice}
    ${NoticeMomentTitle.fragments.moment}
  `,
}

export default CommentLikedNotice
