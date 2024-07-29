import classNames from 'classnames'

import styles from './styles.module.css'

type TabProps = {
  title: string
  selected?: boolean
  onClick: () => void
}

const Tab = ({ title, selected, onClick }: TabProps) => {
  const liClasses = classNames({
    [styles.tabItem]: true,
    [styles.selected]: selected,
  })
  return (
    <li
      className={liClasses}
      role="button"
      onClick={onClick}
      data-title={title}
    >
      {title}
    </li>
  )
}

interface SquareTabsProps {
  sticky?: boolean
}

export const SquareTabs: React.FC<React.PropsWithChildren<SquareTabsProps>> & {
  Tab: typeof Tab
} = ({ children, sticky }) => {
  const navClasses = classNames({
    [styles.tabList]: true,
    [styles.sticky]: sticky,
  })

  return (
    <ul role="tablist" className={navClasses}>
      {children}
    </ul>
  )
}

SquareTabs.Tab = Tab
