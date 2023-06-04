import styles from './styles.module.css'

const Overlay = (props: { style: React.CSSProperties }) => (
  <div aria-hidden className={styles.overlay} {...props}></div>
)

export default Overlay
