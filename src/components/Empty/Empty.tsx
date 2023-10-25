import { Alert } from '@reach/alert'
import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

interface EmptyProps {
  description: string | React.ReactNode
  icon?: React.ReactNode
  spacingY?: 'xxloose' | 'xxxloose'
  footer?: React.ReactNode
}

export const Empty = ({
  icon,
  description,
  spacingY = 'xxxloose',
  footer,
}: EmptyProps) => {
  const emptyClasses = classNames({
    [styles.empty]: true,
    [styles[`spacingY${capitalizeFirstLetter(spacingY)}`]]: !!spacingY,
  })

  return (
    <section className={emptyClasses}>
      {icon && <section>{icon}</section>}

      <Alert type="polite">
        <section className={styles.description}>{description}</section>
      </Alert>
      {footer && <section className={styles.footer}>{footer}</section>}
    </section>
  )
}
