import classNames from 'classnames'

import styles from './styles.css'

interface TabProps {
  disable?: boolean
  selected?: boolean
}

interface TabsProps {
  layout?: 'horizontal' | 'auto'
}

const Tab: React.FC<TabProps> = ({
  children,
  disable = false,
  selected = false
}) => {
  return (
    <li role="tab" aria-disabled={disable} aria-selected={selected}>
      {children}

      <style jsx>{styles}</style>
    </li>
  )
}

export const Tabs: React.FC<TabsProps> & {
  Tab: typeof Tab
} = ({ children, layout = 'auto' }) => {
  const navClass = classNames({
    [layout]: !!layout
  })

  return (
    <nav className={navClass}>
      <ul role="tablist">{children}</ul>

      <style jsx>{styles}</style>
    </nav>
  )
}

Tabs.Tab = Tab
