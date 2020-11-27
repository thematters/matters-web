import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.css'

export interface LinkWrapperProps {
  href: string

  textActiveColor?: 'green'

  disabled?: boolean
  onClick?: () => void
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
        onClick={(e) => {
          if (onClick) {
            onClick()
            e.stopPropagation()
          }
        }}
      >
        {children}

        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}
