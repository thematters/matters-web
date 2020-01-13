import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeComment from './NoticeComment'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

import { CommentPinnedNotice as NoticeType } from './__generated__/CommentPinnedNotice'

const CommentPinnedNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={notice.actor} key={notice.actor.id} />
      </section>

      <section className="content-wrap">
        <h4>
          <NoticeActorName user={notice.actor} />
          <Translate zh_hant="置頂了你的評論" zh_hans="置顶了你的评论" />{' '}
        </h4>

        <NoticeComment comment={notice.target} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CommentPinnedNotice.fragments = {
  notice: gql`
    fragment CommentPinnedNotice on CommentPinnedNotice {
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

export default CommentPinnedNotice
