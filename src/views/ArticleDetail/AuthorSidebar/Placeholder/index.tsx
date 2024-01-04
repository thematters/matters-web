import { Placeholder as AuthorPlaceholder } from '../Author/Placeholder'
import styles from './styles.module.css'

const ItemPlaceholder = () => {
  return (
    <section className={styles.item}>
      <section className={styles.left}>
        <section className={styles.title}></section>
        <section className={styles.content}></section>
      </section>
      <section className={styles.image}></section>
    </section>
  )
}

export const Placeholder = () => {
  return (
    <section className={styles.container}>
      <AuthorPlaceholder />
      <section className={styles.tabs}>
        <section className={styles.tabItem}></section>
        <section className={styles.tabItem}></section>
      </section>
      <section className={styles.feed}>
        <ItemPlaceholder />
        <ItemPlaceholder />
        <ItemPlaceholder />
      </section>
    </section>
  )
}
