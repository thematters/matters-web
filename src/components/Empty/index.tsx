import classNames from 'classnames'

import styles from './styles.css'

type EmptySpacing = '0' | 'default'

interface EmptyProps {
  icon?: React.ReactNode
  description?: string | React.ReactNode
  size?: 'default' | 'small'
  spacing?: [EmptySpacing, EmptySpacing]
}

export const Empty: React.FC<EmptyProps> = ({
  icon,
  description,
  size = 'default',
  spacing = ['default', 'default'],

  children
}) => {
  const containerClasses = classNames({
    container: true,
    [size]: true,
    [`spacing-vertical-${spacing[0]}`]: true,
    [`spacing-horizontal-${spacing[1]}`]: true,
    'icon-only': icon && !description && !children,
    'description-only': !icon && description && !children,
    'children-included': children
  })

  return (
    <section className={containerClasses}>
      {icon && <section className="icon">{icon}</section>}
      {description && <section className="description">{description}</section>}
      {children && <section className="children">{children}</section>}

      <style jsx>{styles}</style>
    </section>
  )
}
