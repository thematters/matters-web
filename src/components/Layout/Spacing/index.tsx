import styles from './styles.module.css'

const Spacing: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <section className={styles.spacing}>{children}</section>
)

export default Spacing
