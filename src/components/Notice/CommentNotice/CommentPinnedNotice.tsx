import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeComment from '../NoticeComment'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

import { CommentPinnedNotice as NoticeType } from './__generated__/CommentPinnedNotice'

const CommentPinnedNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <NoticeActorName user={actor} />{' '}
          <Translate
            zh_hant="置頂了你的評論"
            zh_hans="置顶了你的评论"
            en="pinned your comment"
          />
        </NoticeHead>

        <NoticeComment comment={notice.comment} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CommentPinnedNotice.fragments = {
  notice: gql`
    fragment CommentPinnedNotice on CommentNotice {
      id
      ...NoticeHead
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      comment: target {
        ...NoticeComment
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeComment.fragments.comment}
    ${NoticeHead.fragments.date}
  `,
}

export default CommentPinnedNotice
