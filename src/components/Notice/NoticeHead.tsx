import styles from './styles.css'

type NoticeHeadProps = {
  subtitle?: React.ReactNode
}

const NoticeHead: React.FC<React.PropsWithChildren<NoticeHeadProps>> = ({
  subtitle,
  children,
}) => {
  return (
    <section className="head-wrap">
      <h4>{children}</h4>
      {subtitle && <p>{subtitle}</p>}
      <style jsx>{styles}</style>
    </section>
  )
}

export default NoticeHead
