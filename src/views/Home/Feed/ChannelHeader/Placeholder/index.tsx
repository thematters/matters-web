import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <section className={styles.header}>
      <h1>
        <div className={placeholderStyles.name} />
      </h1>
      <p className={styles.description}>
        <div className={placeholderStyles.description} />
      </p>
    </section>
  )
}

export default Placeholder
