import classNames from 'classnames'

import { Button, ButtonProps } from '~/components'

import styles from './styles.module.css'

type TabProps = {
  selected?: boolean
} & ButtonProps

const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({
  selected,
  children,
  ...buttonProps
}) => {
  const itemClasses = classNames({
    [styles.tabItem]: true,
    [styles.selected]: selected,
  })

  return (
    <li
      className={itemClasses}
      role="tab"
      aria-disabled={buttonProps.disabled}
      aria-selected={selected}
    >
      <Button
        size={[null, '1.875rem']}
        spacing={[0, 10]}
        borderRadius="0.5rem"
        textColor={selected ? 'white' : 'greyDarker'}
        bgColor={selected ? 'black' : 'greyLighter'}
        bgActiveColor={selected ? undefined : 'greyLight'}
        {...buttonProps}
      >
        <span>{children}</span>
      </Button>
    </li>
  )
}

interface SquareTabsProps {
  sticky?: boolean
}

export const SquareTabs: React.FC<React.PropsWithChildren<SquareTabsProps>> & {
  Tab: typeof Tab
} = ({ sticky, children }) => {
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
