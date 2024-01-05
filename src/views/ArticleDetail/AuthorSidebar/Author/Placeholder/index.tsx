import styles from './styles.module.css'

export const Placeholder = () => {
  return (
    <section className={styles.container}>
      <section className={styles.avatar}></section>
      <section className={styles.info}>
        <section className={styles.displayName}></section>
        <section className={styles.bio}></section>
      </section>
    </section>
  )
}
