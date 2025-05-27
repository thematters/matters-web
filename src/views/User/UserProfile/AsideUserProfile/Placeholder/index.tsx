import IMAGE_PLACEHOLDER from '@/public/static/images/placeholder.svg?url'
import { Avatar, useRoute } from '~/components'

import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  return (
    <section className={styles.userProfile} aria-busy="true" aria-live="polite">
      <header className={styles.header}>
        <section className={styles.avatar}>
          <Avatar size={120} src={IMAGE_PLACEHOLDER} inProfile />
        </section>
      </header>

      <section className={styles.info}>
        <section className={styles.displayName}></section>

        <section className={styles.username}>
          <span className={styles.name}>@{userName}</span>
        </section>

        <section className={styles.follow}>
          <div className={placeholderStyles.followers} />
        </section>

        <div className={placeholderStyles.description} />
        <div className={placeholderStyles.description} />
        <div className={placeholderStyles.description} />

        <section className={styles.buttons}>
          <div className={placeholderStyles.buttons} />
        </section>
      </section>
    </section>
  )
}

export default Placeholder
