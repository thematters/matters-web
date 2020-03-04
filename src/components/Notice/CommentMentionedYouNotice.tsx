import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeComment from './NoticeComment'
import NoticeHead from './NoticeHead'
import styles from './styles.css'

import { CommentMentionedYouNotice as NoticeType } from './__generated__/CommentMentionedYouNotice'

const CommentMentionedYouNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={notice.actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <NoticeActorName user={notice.actor} />{' '}
          <Translate zh_hant="在評論中提及了你" zh_hans="在评论中提及了你" />
        </NoticeHead>

        <NoticeComment comment={notice.target} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CommentMentionedYouNotice.fragments = {
  notice: gql`
    fragment CommentMentionedYouNotice on CommentMentionedYouNotice {
      id
      unread
      __typename
      ...NoticeHead
      actor {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        ...NoticeComment
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeComment.fragments.comment}
    ${NoticeHead.fragments.date}
  `
}

export default CommentMentionedYouNotice
