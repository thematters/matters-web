import styles from './styles.module.css'

const Overlay = (props: { style: React.CSSProperties }) => (
  <div aria-hidden className="overlay" {...props}></div>
)

export default Overlay
