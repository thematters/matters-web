import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleNewCommentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

const ArticleNewCommentNotice = ({
  notice,
}: {
  notice: ArticleNewCommentNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const commentArticle =
    notice.comment?.node.__typename === 'Article'
      ? notice.comment.node
      : undefined
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="commented"
          id="lZukEr"
          description="src/components/Notice/CommentNotice/ArticleNewCommentNotice.tsx"
        />
      }
      title={
        commentArticle?.__typename === 'Article' ? (
          <NoticeArticleTitle article={commentArticle} />
        ) : undefined
      }
      content={<NoticeComment comment={notice.comment} />}
      testId={TEST_ID.NOTICE_ARTICLE_NEW_COMMENT}
    />
  )
}

ArticleNewCommentNotice.fragments = {
  notice: gql`
    fragment ArticleNewCommentNotice on CommentNotice {
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

export default ArticleNewCommentNotice
