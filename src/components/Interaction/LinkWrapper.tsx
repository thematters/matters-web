import Link from 'next/link'

interface LinkWrapperProps {
  href: string
  as: string

  disabled?: boolean
}

export const LinkWrapper: React.FC<LinkWrapperProps> = ({
  href,
  as,

  disabled,

  children
}) =>
  disabled ? (
    <>{children}</>
  ) : (
    <Link href={href} as={as}>
      <a onClick={e => e.stopPropagation()}>{children}</a>
    </Link>
  )
