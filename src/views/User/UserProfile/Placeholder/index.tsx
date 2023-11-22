import classNames from 'classnames'

import IMG_PLACEHOLDER from '@/public/static/images/placeholder.svg'
import { Avatar, Cover, Media, useRoute } from '~/components'

import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const rightClasses = classNames({
    [styles.right]: true,
    [styles.spaceTop]: true,
  })

  return (
    <section className={styles.userProfile} aria-busy="true" aria-live="polite">
      <Cover fallbackCover={IMG_PLACEHOLDER} />

      <Media at="sm">
        <header className={styles.header}>
          <section className={styles.avatar}>
            <Avatar size="xxxlm" src={IMG_PLACEHOLDER} />
          </section>

          <section className={rightClasses}>
            <div className={placeholderStyles.followButton} />
            <div className={placeholderStyles.moreButton} />
          </section>
        </header>

        <section className={styles.info}>
          <section className={styles.displayName}></section>

          <section className={styles.username}>
            <span className={styles.name}>@{userName}</span>
          </section>
        </section>

        <section className={styles.follow}></section>

        <section className={styles.footer}>
          <div className={placeholderStyles.description} />
          <div className={placeholderStyles.description} />
          <div className={placeholderStyles.description} />
        </section>
      </Media>
    </section>
  )
}

export default Placeholder
