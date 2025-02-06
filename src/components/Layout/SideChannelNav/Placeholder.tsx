import styles from './styles.module.css'

export default function Placeholder() {
  return (
    <div className={styles.placeholder}>
      <div className={styles.placeholderText} />
      <div className={styles.placeholderText} />
      <div className={styles.placeholderText} />
    </div>
  )
}
