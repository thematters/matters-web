import classNames from 'classnames'

import styles from './styles.css'

interface EmptyProps {
  icon?: React.ReactNode
  description?: string | React.ReactNode
  button?: React.ReactNode
  spacing?: '0' | 'default'
}

export const Empty: React.FC<EmptyProps> = ({
  icon,
  description,
  button,
  spacing = 'default'
}) => {
  const containerClasses = classNames({
    container: true,
    [`spacing-${spacing}`]: true,
    'icon-only': icon && !description && !button,
    'description-only': !icon && description && !button,
    'button-included': button
  })

  return (
    <section className={containerClasses}>
      {icon && <section className="icon">{icon}</section>}
      {description && <section className="description">{description}</section>}
      {button && <section className="button">{button}</section>}
      <style jsx>{styles}</style>
    </section>
  )
}
