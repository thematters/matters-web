import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.css'

interface TabProps {
  href: string
  as: string

  disable?: boolean
  selected?: boolean
}

interface TabsProps {
  spacingBottom?: 0 | '0' | 'base' | 'loose' | 'xxloose'
}

const Tab: React.FC<TabProps> = ({
  href,
  as,

  disable,
  selected,

  children
}) => {
  return (
    <li role="tab" aria-disabled={disable} aria-selected={selected}>
      <Link href={href} as={as}>
        <a>{children}</a>
      </Link>

      <style jsx>{styles}</style>
    </li>
  )
}

export const Tabs: React.FC<TabsProps> & {
  Tab: typeof Tab
} = ({ spacingBottom = 'base', children }) => {
  const navClass = classNames({
    [`spacing-bottom-${spacingBottom}`]: !!spacingBottom
  })

  return (
    <nav className={navClass}>
      <ul role="tablist">{children}</ul>

      <style jsx>{styles}</style>
    </nav>
  )
}

Tabs.Tab = Tab
