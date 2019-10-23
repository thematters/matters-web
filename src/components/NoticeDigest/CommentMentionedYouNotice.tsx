import gql from 'graphql-tag'

import { Translate } from '~/components'

import { CommentMentionedYouNotice as NoticeType } from './__generated__/CommentMentionedYouNotice'
import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeComment from './NoticeComment'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

const CommentMentionedYouNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={notice.actor} key={notice.actor.id} />
      </section>

      <section className="content-wrap">
        <h4>
          <NoticeActorName user={notice.actor} />{' '}
          <Translate zh_hant="在評論中提及了你" zh_hans="在评论中提及了你" />
        </h4>

        <NoticeComment comment={notice.target} />

        <NoticeDate notice={notice} />
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
      ...NoticeDate
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
    ${NoticeDate.fragments.notice}
  `
}

export default CommentMentionedYouNotice
