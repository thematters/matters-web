import styles from './styles.module.css'

export const UserDigestRichPlaceholder = () => {
  return (
    <section className={styles.placeholder}>
      <section className={styles.avatar}></section>
      <section className={styles.content}></section>
    </section>
  )
}
