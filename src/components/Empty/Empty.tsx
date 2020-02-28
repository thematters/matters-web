import classNames from 'classnames'

import styles from './styles.css'

type EmptySpacing = '0' | 'loose'

interface EmptyProps {
  icon?: React.ReactNode
  description?: string | React.ReactNode

  size?: 'sm'
  spacing?: [EmptySpacing, EmptySpacing]
}

export const Empty: React.FC<EmptyProps> = ({
  icon,
  description,

  size,
  spacing = ['loose', 'loose'],

  children
}) => {
  const containerClasses = classNames({
    container: true,
    [`size-${size}`]: true,
    [`spacing-y-${spacing[0]}`]: true,
    [`spacing-x-${spacing[1]}`]: true,
    'icon-only': icon && !description && !children,
    'description-only': !icon && description && !children,
    'children-included': children
  })

  return (
    <section className={containerClasses}>
      {icon && <section>{icon}</section>}
      {description && <section className="description">{description}</section>}
      {children && <section className="children">{children}</section>}

      <style jsx>{styles}</style>
    </section>
  )
}
