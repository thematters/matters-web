import styles from './styles.module.css'

export default function PlaceHolder() {
  return (
    <div className={styles.placeholderContainer}>
      {[...Array(8)].map((_, index) => (
        <div key={index} className={styles.placeholderBox}></div>
      ))}
    </div>
  )
}
