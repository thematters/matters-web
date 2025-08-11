import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.module.css'

type TabProps = {
  href?: string
  selected?: boolean
  count?: number
  textSize?: 14 | 16
  onClick?: () => void
  disabled?: boolean
}

const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({
  href,
  selected,
  count,
  textSize = 14,
  children,
  onClick,
  disabled = false,
}) => {
  const classes = classNames({
    [styles.item]: true,
    [styles.selected]: !disabled && selected,
    [styles.disabled]: disabled,
    [styles[`textSize${textSize}`]]: !!textSize,
  })

  if (disabled) {
    return (
      <li role="tab" aria-selected={selected} className={classes}>
        {children}
        {count && <span className={styles.count}>&nbsp;{count}</span>}
      </li>
    )
  }

  if (href) {
    return (
      <li
        role="tab"
        aria-selected={selected}
        className={classes}
        onClick={onClick}
      >
        <Link href={href || ''}>
          {children}
          {count && <span className={styles.count}>&nbsp;{count}</span>}
        </Link>
      </li>
    )
  }

  return (
    <li
      role="tab"
      aria-selected={selected}
      className={classes}
      onClick={onClick}
    >
      {children}
      {count && <span className={styles.count}>&nbsp;{count}</span>}
    </li>
  )
}

interface TabsProps {
  noSpacing?: boolean
  fill?: boolean
}

export const Tabs: React.FC<React.PropsWithChildren<TabsProps>> & {
  Tab: typeof Tab
} = ({ noSpacing, fill, children }) => {
  const tabsClasses = classNames({
    [styles.tabs]: true,
    [styles.noSpacing]: !!noSpacing,
  })

  const listClasses = classNames({
    [styles.list]: true,
    [styles.fillList]: !!fill,
  })

  return (
    <nav className={tabsClasses}>
      <ul role="tablist" className={listClasses}>
        {children}
      </ul>
    </nav>
  )
}

Tabs.Tab = Tab
