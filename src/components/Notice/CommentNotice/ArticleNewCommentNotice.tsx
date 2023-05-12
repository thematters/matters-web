import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleNewCommentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeComment from '../NoticeComment'
import NoticeContentActors from '../NoticeContentActors'
import NoticeDate from '../NoticeDate'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMultiActors from '../NoticeMultiActors'
import styles from '../styles.css'

const ArticleNewCommentNotice = ({
  notice,
}: {
  notice: ArticleNewCommentNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actors = notice.actors
  const commentArticle =
    notice.comment?.node.__typename === 'Article'
      ? notice.comment.node
      : undefined

  return (
    <section className="container" data-test-id={TEST_ID.ARTICLE_NEW_COMMENT}>
      <section className="header">
        <NoticeMultiActors actors={actors} size="lg" />
        <section className="single-actor-info">
          <NoticeContentActors
            actors={actors}
            action={
              <FormattedMessage
                defaultMessage="commented on"
                description="src/components/Notice/CommentNotice/ArticleNewCommentNotice.tsx"
              />
            }
            content={
              commentArticle?.__typename === 'Article' ? (
                <NoticeArticleTitle article={commentArticle} />
              ) : undefined
            }
          />
        </section>
      </section>
      <section className="content">
        <NoticeComment comment={notice.comment} />
      </section>
      <section className="footer">
        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
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
