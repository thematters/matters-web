import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <section className={styles.container}>
      <section className={placeholderStyles.header}>
        <section className={placeholderStyles.left} />
        <section className={placeholderStyles.right} />
      </section>

      <section className={placeholderStyles.list}>
        <section className={placeholderStyles.tag}></section>
        <section className={placeholderStyles.tag}></section>
        <section className={placeholderStyles.tag}></section>
      </section>

      <section className={placeholderStyles.list + ' ' + placeholderStyles.lg}>
        <section className={placeholderStyles.tag}></section>
        <section className={placeholderStyles.tag}></section>
      </section>
    </section>
  )
}

export default Placeholder
