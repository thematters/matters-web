import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.css'

interface LinkWrapperProps {
  href: string
  as: string

  textHoverColor?: 'green'

  disabled?: boolean
  onClick?: () => any
}

export const LinkWrapper: React.FC<LinkWrapperProps> = ({
  href,
  as,

  textHoverColor,

  disabled,
  onClick,

  children
}) => {
  if (disabled) {
    return <>{children}</>
  }

  const linkClass = classNames({
    [`text-hover-${textHoverColor}`]: !!textHoverColor
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
