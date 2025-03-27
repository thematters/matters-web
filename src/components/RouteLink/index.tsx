import Link from 'next/link'

type RouteLinkProps = {
  href: string
  children: React.ReactNode
  [key: string]: any
}

export const RouteLink = ({ href, children, ...restProps }: RouteLinkProps) => {
  return (
    <Link href={href}>
      <a {...restProps}>{children}</a>
    </Link>
  )
}
