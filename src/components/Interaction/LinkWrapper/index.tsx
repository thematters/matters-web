import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.css'

export interface LinkWrapperProps {
  href: string

  textActiveColor?: 'green'

  disabled?: boolean
  onClick?: () => any
}

export const LinkWrapper: React.FC<LinkWrapperProps> = ({
  href,

  textActiveColor,

  disabled,
  onClick,

  children,
}) => {
  if (disabled) {
    return <>{children}</>
  }

  const linkClasses = classNames({
    [`text-active-${textActiveColor}`]: !!textActiveColor,
  })

  return (
    <Link href={href}>
      <a
        className={linkClasses}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      >
        {children}

        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}
