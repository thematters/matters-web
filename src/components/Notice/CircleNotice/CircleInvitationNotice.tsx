import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorName from '../NoticeActorName'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CircleInvitationNotice as CircleInvitationNoticeType } from './__generated__/CircleInvitationNotice'

const CircleInvitationNotice = ({
  notice,
}: {
  notice: CircleInvitationNoticeType
}) => {
  if (!notice.actors || !notice.circle) {
    return null
  }

  const circle = notice.circle
  const actor = notice.actors[0]

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="circle" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <Translate zh_hant="恭喜你！" zh_hans="恭喜你！" en="Congrats!" />
          <NoticeActorName user={actor} />
          <Translate
            zh_hant=" 邀請你免費加入圍爐 "
            zh_hans=" 邀请你免费加入围炉 "
            en=" invites you to join circle for "
          />
          {circle?.invitedBy?.freePeriod}
          <Translate
            zh_hant=" 天，前去免費體驗，與大家談天說地吧。"
            zh_hans=" 天，前去免费体验，与大家谈天说地吧。"
            en=" days for free. Let's try it and have fun."
          />
        </NoticeHead>

        <NoticeCircleCard circle={circle} />
        <NoticeDate notice={notice} />
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

CircleInvitationNotice.fragments = {
  notice: gql`
    fragment CircleInvitationNotice on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorNameUser
      }
      circle: target {
        id
        invitedBy {
          id
          freePeriod
        }
        ...NoticeCircleCard
      }
    }
    ${NoticeActorName.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleInvitationNotice
