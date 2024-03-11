import styles from './styles.module.css'

const Content: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <section className={styles.content}>{children}</section>
}

export default Content
