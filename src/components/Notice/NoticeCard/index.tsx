import { ReactElement } from 'react'

import { NoticeActorAvatarUserFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import ActorAvatar from '../ActorAvatar'
import NoticeDate from '../NoticeDate'
import styles from './styles.module.css'

type NoticeCardProps = {
  notice: {
    id: string
    actors?: NoticeActorAvatarUserFragment[] | null
    createdAt: string
  }
  type: string
  action?: string | ReactElement
  content?: string | ReactElement
}

const NoticeCard = ({ notice, type, action, content }: NoticeCardProps) => {
  const actors = notice.actors || []

  // const actorsCount = actors.length
  // const isAnonymous = actorsCount <= 0

  return (
    <section className={styles.container}>
      {/* left */}
      <section className={styles.avatar}>
        <ActorAvatar actors={actors} type={type} />
      </section>

      {/* right */}
      <section className={styles.content}>
        {/* actor, action and timestamp */}
        <section className={styles.actor}>
          <section className={styles.act}>
            <ActorAction actors={actors} action={action} type={type} />
          </section>
          <section className={styles.time}>
            <NoticeDate notice={notice} />
          </section>
        </section>

        {/* extra notice info */}
        {content && <section className={styles.info}>{content}</section>}
      </section>
    </section>
  )
}

export default NoticeCard
