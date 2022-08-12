import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

import { CircleBroadcastMentionedYouNotice as NoticeType } from './__generated__/CircleBroadcastMentionedYouNotice'

const CircleBroadcastMentionedYouNotice = ({
  notice,
}: {
  notice: NoticeType
}) => {
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
        <NoticeHead>
          <NoticeActorName user={actor} />
          <Translate
            zh_hant=" 在圍爐 "
            zh_hans=" 在围炉 "
            en=" mentioned you on "
          />
          <NoticeCircleName circle={notice.circle} />
          <Translate zh_hant={` 廣播提及你`} zh_hans={` 广播提及你`} en="" />
        </NoticeHead>

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CircleBroadcastMentionedYouNotice.fragments = {
  notice: gql`
    fragment CircleBroadcastMentionedYouNotice on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      circle: target {
        ...NoticeCircleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleBroadcastMentionedYouNotice
