import styles from './styles.module.css'

type NoticeHeadProps = {
  subtitle?: React.ReactNode
}

const NoticeHead: React.FC<React.PropsWithChildren<NoticeHeadProps>> = ({
  subtitle,
  children,
}) => {
  return (
    <section className={styles.headWrap}>
      <h4>{children}</h4>
      {subtitle && <p>{subtitle}</p>}
    </section>
  )
}

export default NoticeHead
