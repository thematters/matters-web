import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { CommentLikedFragment, MomentState } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import CommentCard from '../CommentCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCard from '../NoticeCard'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeMomentTitle from '../NoticeMomentTitle'

const CommentLiked = ({ notice }: { notice: CommentLikedFragment }) => {
  const isMoment = notice.comment.node.__typename === 'Moment'
  const commentMoment =
    notice.comment.node.__typename === 'Moment'
      ? notice.comment.node
      : undefined

  if (isMoment && commentMoment?.state === MomentState.Archived) {
    return (
      <NoticeCard
        notice={notice}
        type="like"
        action={
          <FormattedMessage
            defaultMessage="liked your comment"
            id="rsdUz2"
            description="MOMENT"
          />
        }
        content={<CommentCard comment={notice.comment} color="grey" />}
      />
    )
  }

  return (
    <NoticeCard
      notice={notice}
      type="like"
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
      content={
        <CommentCard
          comment={notice.comment}
          color={isMoment ? 'grey' : 'black'}
        />
      }
    />
  )
}

CommentLiked.fragments = {
  notice: gql`
    fragment CommentLiked on CommentNotice {
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
          }
          ... on Moment {
            ...NoticeMomentTitle
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeComment.fragments.comment}
    ${CommentCard.fragments.comment}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeDate.fragments.notice}
    ${NoticeMomentTitle.fragments.moment}
  `,
}

export default CommentLiked
