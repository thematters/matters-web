import Link from 'next/link'

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
      </a>
    </Link>
  )
