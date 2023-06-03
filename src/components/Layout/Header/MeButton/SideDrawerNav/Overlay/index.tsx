import styles from './styles.module.css'

const Overlay = ({ style }: { style: React.CSSProperties }) => (
  <div aria-hidden className="overlay" style={style}></div>
)

export default Overlay
