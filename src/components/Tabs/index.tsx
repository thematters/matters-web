import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.module.css'

type TabProps = {
  href?: string
  selected?: boolean
  count?: number
  onClick?: () => void
}

const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({
  href,
  selected,
  count,
  children,
  onClick,
}) => {
  const classes = classNames({
    [styles.item]: true,
    [styles.selected]: selected,
  })

  if (href) {
    return (
      <li role="tab" aria-selected={selected} className={classes}>
        <Link href={href || ''} legacyBehavior>
          <a>
            {children}
            {count && <span className={styles.count}>&nbsp;{count}</span>}
          </a>
        </Link>
      </li>
    )
  }

  return (
    <li role="tab" aria-selected={selected} className={classes}>
      <button onClick={onClick}>
        {children}
        {count && <span className={styles.count}>&nbsp;{count}</span>}
      </button>
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
