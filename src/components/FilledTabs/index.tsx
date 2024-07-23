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

export const FilledTabs: React.FC<React.PropsWithChildren<{}>> & {
  Tab: typeof Tab
} = ({ children }) => {
  return (
    <ul role="tablist" className={styles.tabList}>
      {children}
    </ul>
  )
}

FilledTabs.Tab = Tab
