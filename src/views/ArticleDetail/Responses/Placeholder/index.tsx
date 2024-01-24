import styles from './styles.module.css'

export const CommentDigestPlaceholder = () => {
  return (
    <section className={styles.comment}>
      <section>
        <div className={styles.avatar}></div>
      </section>
      <section className={styles.content}>
        <p></p>
        <p></p>
        <p></p>
      </section>
    </section>
  )
}

export const Placeholder = () => {
  return (
    <section className={styles.CommentFeed}>
      <CommentDigestPlaceholder />
      <CommentDigestPlaceholder />
    </section>
  )
}
