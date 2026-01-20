import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ArticleNewCommentFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import ArticleCard from '../ArticleCard'
import CommentCard from '../CommentCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCard from '../NoticeCard'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'

const ArticleNewComment = ({
  notice,
}: {
  notice: ArticleNewCommentFragment
}) => {
  const commentArticle =
    notice.comment?.node.__typename === 'Article'
      ? notice.comment.node
      : undefined

  return (
    <NoticeCard
      notice={notice}
      type="comment"
      action={
        <FormattedMessage
          defaultMessage="commented"
          id="lZukEr"
          description="src/components/Notice/CommentNotice/ArticleNewCommentNotice.tsx"
        />
      }
      content={
        <>
          {commentArticle && <ArticleCard article={commentArticle} />}
          <CommentCard comment={notice.comment} />
        </>
      }
    />
  )
}

ArticleNewComment.fragments = {
  notice: gql`
    fragment ArticleNewComment on CommentNotice {
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
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${ArticleCard.fragments.article}
    ${CommentCard.fragments.comment}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticleNewComment
