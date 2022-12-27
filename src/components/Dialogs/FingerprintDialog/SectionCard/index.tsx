import classNames from 'classnames'

import contentStyles from '../styles.css'
import styles from './styles.css'

const SectionCard: React.FC<
  React.PropsWithChildren<{
    title: string | React.ReactNode
    subTitle: string | React.ReactNode
    right?: string | React.ReactNode
    warning?: boolean
  }>
> = ({ title, subTitle, right, children, warning }) => {
  const subtitleClasses = classNames({
    subtitle: true,
    error: warning,
  })

  return (
    <section className="card">
      <header>
        <h3>{title}</h3>
        {right || <section className="right">{right}</section>}
      </header>

      <p className={subtitleClasses}>{subTitle}</p>

      {children}

      <style jsx>{styles}</style>
      <style jsx>{contentStyles}</style>
    </section>
  )
}

export default SectionCard
