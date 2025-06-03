import classNames from 'classnames'
import Link from 'next/link'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

export interface LinkWrapperProps {
  href: string

  textActiveColor?: 'green'

  disabled?: boolean
  onClick?: () => void

  testId?: TEST_ID
}

export const LinkWrapper: React.FC<
  React.PropsWithChildren<LinkWrapperProps>
> = ({
  href,

  textActiveColor,

  disabled,
  onClick,

  testId,

  children,
}) => {
  if (disabled) {
    return <>{children}</>
  }

  const linkClasses = classNames({
    [styles.wrapper]: true,
    [textActiveColor
      ? styles[`textActive${capitalizeFirstLetter(textActiveColor)}`]
      : '']: !!textActiveColor,
  })

  return (
    <Link
      href={href}
      className={linkClasses}
      onClick={(e) => {
        if (onClick) {
          onClick()
          e.stopPropagation()
        }
      }}
      {...(testId ? { ['data-test-id']: testId } : {})}
    >
      {children}
    </Link>
  )
}
