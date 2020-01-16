import Link from 'next/link'

interface LinkWrapperProps {
  href: string
  as: string

  isBanned: boolean
}

const LinkWrapper: React.FC<LinkWrapperProps> = ({
  href,
  as,

  isBanned,

  children
}) =>
  isBanned ? (
    <span>{children}</span>
  ) : (
    <Link href={href} as={as}>
      <a>{children}</a>
    </Link>
  )

export default LinkWrapper
