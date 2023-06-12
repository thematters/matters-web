import classNames from 'classnames'

import contentStyles from '../styles.module.css'
import styles from './styles.module.css'

const SectionCard: React.FC<
  React.PropsWithChildren<{
    title?: string | React.ReactNode
    description?: string | React.ReactNode
    right?: string | React.ReactNode
    warning?: boolean
  }>
> = ({ title, description, right, children, warning }) => {
  const descriptionClasses = classNames({
    [styles.description]: true,
    [contentStyles.description]: true,
    [styles.error]: warning,
  })

  return (
    <section className={styles.card}>
      {title && (
        <header className={styles.header}>
          <h3>{title}</h3>
          {right || <section className={styles.right}>{right}</section>}
        </header>
      )}

      {description && <p className={descriptionClasses}>{description}</p>}

      {children}
    </section>
  )
}

export default SectionCard
