import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const DescriptionPlaceholder = () => {
  return (
    <section className={styles.spaceTop} aria-busy="true" aria-live="polite">
      <div className={placeholderStyles.text} />
      <div className={placeholderStyles.text} />
      <div className={placeholderStyles.text} />
      <div className={placeholderStyles.text} />
    </section>
  )
}

export default DescriptionPlaceholder
