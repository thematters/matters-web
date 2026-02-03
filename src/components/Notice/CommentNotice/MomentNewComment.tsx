import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { MomentNewCommentFragment, MomentState } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import CommentCard from '../CommentCard'
import MomentCard from '../MomentCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeMomentTitle from '../NoticeMomentTitle'

const MomentNewComment = ({ notice }: { notice: MomentNewCommentFragment }) => {
  const commentMoment =
    notice.comment?.node.__typename === 'Moment'
      ? notice.comment.node
      : undefined

  if (commentMoment?.state === MomentState.Archived) {
    return (
      <NoticeCard
        notice={notice}
        type="comment"
        action={
          <FormattedMessage
            defaultMessage="commented in your moment"
            id="qCotH5"
            description="src/components/Notice/CommentNotice/MomentNewCommentNotice.tsx"
          />
        }
        content={
          <>
            {commentMoment && <MomentCard moment={commentMoment} />}
            <CommentCard comment={notice.comment} />
          </>
        }
      />
    )
  }

  return (
    <NoticeCard
      notice={notice}
      type="comment"
      action={
        <FormattedMessage
          defaultMessage="commented in your moment"
          id="qCotH5"
          description="src/components/Notice/CommentNotice/MomentNewCommentNotice.tsx"
        />
      }
      content={
        <>
          {commentMoment && <MomentCard moment={commentMoment} />}
          <CommentCard comment={notice.comment} />
        </>
      }
    />
  )
}

MomentNewComment.fragments = {
  notice: gql`
    fragment MomentNewComment on CommentNotice {
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
          ... on Moment {
            ...NoticeMomentTitle
            ...MomentCardMoment
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeComment.fragments.comment}
    ${CommentCard.fragments.comment}
    ${NoticeDate.fragments.notice}
    ${NoticeMomentTitle.fragments.moment}
    ${MomentCard.fragments.moment}
  `,
}

export default MomentNewComment
