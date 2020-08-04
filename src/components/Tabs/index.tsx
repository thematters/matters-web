import classNames from 'classnames'

import { Button, ButtonProps, TextIcon } from '~/components'

import styles from './styles.css'

type TabProps = {
  selected?: boolean
} & ButtonProps

const Tab: React.FC<TabProps> = ({ selected, children, ...buttonProps }) => {
  return (
    <li
      role="tab"
      aria-disabled={buttonProps.disabled}
      aria-selected={selected}
    >
      <Button
        spacing={['xtight', 'base']}
        bgColor={selected ? 'green-lighter' : 'white'}
        bgActiveColor={selected ? 'green-lighter' : 'grey-lighter'}
        {...buttonProps}
      >
        <TextIcon
          size="md"
          color={selected ? 'green' : 'grey'}
          weight="semibold"
        >
          {children}
        </TextIcon>
      </Button>

      <style jsx>{styles}</style>
    </li>
  )
}

interface TabsProps {
  sticky?: boolean
}

export const Tabs: React.FC<TabsProps> & {
  Tab: typeof Tab
} = ({ sticky, children }) => {
  const navClasses = classNames({
    sticky,
  })

  return (
    <nav className={navClasses}>
      <ul role="tablist">{children}</ul>

      <style jsx>{styles}</style>
    </nav>
  )
}

Tabs.Tab = Tab
