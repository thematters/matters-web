import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.module.css'

type TabProps = {
  href: string
  selected?: boolean
  count?: number
}

const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({
  href,
  selected,
  count,
  children,
}) => {
  const classes = classNames({
    [styles.item]: true,
    [styles.selected]: selected,
  })

  return (
    <li role="tab" aria-selected={selected} className={classes}>
      <Link href={href} legacyBehavior>
        <a>
          {children}
          {count && <span className={styles.count}>&nbsp;{count}</span>}
        </a>
      </Link>
    </li>
  )
}

interface TabsProps {}

export const Tabs: React.FC<React.PropsWithChildren<TabsProps>> & {
  Tab: typeof Tab
} = ({ children }) => {
  return (
    <nav className={styles.tabs}>
      <ul role="tablist" className={styles.list}>
        {children}
      </ul>
    </nav>
  )
}

Tabs.Tab = Tab
