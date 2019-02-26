import styles from './styles.css'

interface TabProps {
  disable?: boolean
  selected?: boolean
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

export const Tabs: React.FC & { Tab: typeof Tab } = ({ children }) => {
  return (
    <nav>
      <ul role="tablist">{children}</ul>
      <style jsx>{styles}</style>
    </nav>
  )
}

Tabs.Tab = Tab
