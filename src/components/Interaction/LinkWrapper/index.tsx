import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.css'

export interface LinkWrapperProps {
  href: string
  as: string

  textActiveColor?: 'green'

  disabled?: boolean
  onClick?: () => any
}

export const LinkWrapper: React.FC<LinkWrapperProps> = ({
  href,
  as,

  textActiveColor,

  disabled,
  onClick,

  children,
}) => {
  if (disabled) {
    return <>{children}</>
  }

  const linkClass = classNames({
    [`text-active-${textActiveColor}`]: !!textActiveColor,
  })

  return (
    <Link href={href} as={as}>
      <a
        className={linkClass}
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
