import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

import { InCircleNewBroadcastNotice as NoticeType } from './__generated__/InCircleNewBroadcastNotice'

const InCircleNewBroadcastNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const circle = notice.circle
  const actor = notice.actors[0]

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={notice.actors[0]} />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeActorName user={actor} />
          <Translate zh_hant=" 在圍爐 " zh_hans=" 在围炉 " en="" />
          <NoticeCircleName circle={circle} />
          <Translate
            zh_hant=" 發布新的廣播："
            zh_hans=" 发布新的广播："
            en=""
          />
        </NoticeHead>

        <NoticeComment comment={notice.reply} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}
InCircleNewBroadcastNotice.fragments = {
  notice: gql`
    fragment InCircleNewBroadcastNotice on CircleCommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      circle: target {
        ...NoticeCircleCard
      }
      reply: comment {
        ...NoticeComment
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default InCircleNewBroadcastNotice
