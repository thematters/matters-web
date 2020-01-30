import Link from 'next/link'

import styles from './styles.css'

interface LinkWrapperProps {
  href: string
  as: string

  disabled?: boolean
  onClick?: () => any
}

export const LinkWrapper: React.FC<LinkWrapperProps> = ({
  href,
  as,

  disabled,
  onClick,

  children
}) =>
  disabled ? (
    <>{children}</>
  ) : (
    <Link href={href} as={as}>
      <a
        onClick={e => {
          e.stopPropagation()

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
