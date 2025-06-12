import jump from 'jump.js'

import styles from './styles.module.css'

const LayoutHeaderTitle: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => (
  <h1 onClick={() => jump(document.body)} className={styles.title}>
    {children}
  </h1>
)

export default LayoutHeaderTitle
