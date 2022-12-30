import classNames from 'classnames'

import contentStyles from '../styles.css'
import styles from './styles.css'

const SectionCard: React.FC<
  React.PropsWithChildren<{
    title?: string | React.ReactNode
    description?: string | React.ReactNode
    right?: string | React.ReactNode
    warning?: boolean
  }>
> = ({ title, description, right, children, warning }) => {
  const descriptionClasses = classNames({
    description: true,
    error: warning,
  })

  return (
    <section className="card">
      {title && (
        <header>
          <h3>{title}</h3>
          {right || <section className="right">{right}</section>}
        </header>
      )}

      {description && <p className={descriptionClasses}>{description}</p>}

      {children}

      <style jsx>{styles}</style>
      <style jsx>{contentStyles}</style>
    </section>
  )
}

export default SectionCard
