import Link from 'next/link'

import { Url } from '~/common/utils'

import styles from './styles.css'

interface TabProps {
  href?: Url
  as?: string

  disable?: boolean
  selected?: boolean

  sup?: React.ReactNode | string
}

const Tab: React.FC<TabProps> = ({
  href,
  as,

  disable,
  selected,

  sup,
  children,
}) => {
  if (href && as) {
    return (
      <li role="tab" aria-disabled={disable} aria-selected={selected}>
        <Link href={href} as={as}>
          <a>
            <span className="content">{children}</span>
            {sup && <sup>{sup}</sup>}
          </a>
        </Link>
        <style jsx>{styles}</style>
      </li>
    )
  }

  return (
    <li role="tab" aria-disabled={disable} aria-selected={selected}>
      <span className="content">{children}</span>
      {sup && <sup>{sup}</sup>}

      <style jsx>{styles}</style>
    </li>
  )
}

export const Tabs: React.FC & {
  Tab: typeof Tab
} = ({ children }) => {
  return (
    <nav>
      <ul role="tablist">{children}</ul>

      <style jsx>{styles}</style>
    </nav>
  )
}

Tabs.Tab = Tab
