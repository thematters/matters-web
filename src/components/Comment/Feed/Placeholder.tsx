import { Avatar } from '~/components/Avatar'

import styles from './styles.module.css'
const Placeholder = () => {
  return (
    <article className={styles.comment}>
      <header className={styles.header}>
        <section className={styles.left}>
          <section className={styles.author}>
            <Avatar.Placeholder size={40} />
            <section className={styles.info}>
              <section className={styles.top}>
                <div className={styles.displayNamePlaceholder} />
              </section>
              <div className={styles.createdAtPlaceholder} />
            </section>
          </section>
        </section>
        <section className={styles.right}></section>
      </header>

      <section className={styles.contentContainer}>
        <div className={styles.contentPlaceholder} />
        <div className={styles.contentPlaceholder} />
      </section>
    </article>
  )
}

export default Placeholder
