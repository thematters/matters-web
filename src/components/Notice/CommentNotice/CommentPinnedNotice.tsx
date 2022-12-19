import gql from 'graphql-tag'

import { Translate } from '~/components'

import { TEST_ID } from '~/common/enums'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

import { CommentPinnedNotice as NoticeType } from './__generated__/CommentPinnedNotice'

const CommentPinnedNotice = ({ notice }: { notice: NoticeType }) => {
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
          <Translate
            zh_hant=" 置頂了你在作品 "
            zh_hans=" 置顶了你在作品 "
            en=" pinned your comment on "
          />
          {commentArticle && <NoticeArticleTitle article={commentArticle} />}
          <Translate zh_hant=" 的評論" zh_hans=" 的评论" en="" />
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
