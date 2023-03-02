import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CommentPinnedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

const CommentPinnedNotice = ({
  notice,
}: {
  notice: CommentPinnedNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]
  const commentArticle =
    notice.comment?.node.__typename === 'Article'
      ? notice.comment.node
      : undefined

  return (
    <section className="container" data-test-id={TEST_ID.COMMENT_PINNED}>
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeActorName user={actor} />
          <FormattedMessage
            defaultMessage="pinned your comment on"
            description="src/components/Notice/CommentNotice/CommentPinnedNotice.tsx"
          />
          {commentArticle && <NoticeArticleTitle article={commentArticle} />}
          <FormattedMessage defaultMessage="comment" />
        </NoticeHead>

        <NoticeComment comment={notice.comment} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CommentPinnedNotice.fragments = {
  notice: gql`
    fragment CommentPinnedNotice on CommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
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
    ${NoticeActorName.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CommentPinnedNotice
