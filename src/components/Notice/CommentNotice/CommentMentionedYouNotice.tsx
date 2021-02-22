import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeComment from '../NoticeComment'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

import { CommentMentionedYouNotice as NoticeType } from './__generated__/CommentMentionedYouNotice'

const CommentMentionedYouNotice = ({ notice }: { notice: NoticeType }) => {
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
            zh_hant="在評論中提及了你"
            zh_hans="在评论中提及了你"
            en="mentioned you in comment"
          />
        </NoticeHead>

        <NoticeComment comment={notice.comment} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CommentMentionedYouNotice.fragments = {
  notice: gql`
    fragment CommentMentionedYouNotice on CommentNotice {
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

export default CommentMentionedYouNotice
