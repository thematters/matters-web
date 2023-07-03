import classNames from 'classnames'

import { Button, ButtonProps, TextIcon } from '~/components'

import styles from './styles.module.css'

type TabProps = {
  selected?: boolean
} & ButtonProps

const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({
  selected,
  children,
  ...buttonProps
}) => {
  return (
    <li
      role="tab"
      aria-disabled={buttonProps.disabled}
      aria-selected={selected}
    >
      <Button
        spacing={['xtight', 'base']}
        bgColor={selected ? 'greenLighter' : 'white'}
        bgActiveColor={selected ? 'greenLighter' : 'greyLighter'}
        {...buttonProps}
      >
        <TextIcon
          size="md"
          color={selected ? 'green' : 'greyDarker'}
          weight="semibold"
        >
          {children}
        </TextIcon>
      </Button>
    </li>
  )
}

interface SegmentedTabsProps {
  sticky?: boolean
  side?: React.ReactNode
}

export const SegmentedTabs: React.FC<
  React.PropsWithChildren<SegmentedTabsProps>
> & {
  Tab: typeof Tab
} = ({ sticky, side, children }) => {
  const navClasses = classNames({
    [styles.nav]: true,
    [styles.sticky]: sticky,
    [styles.hasSide]: !!side,
  })

  return (
    <nav className={navClasses}>
      <ul role="tablist">{children}</ul>
      {side}
    </nav>
  )
}

SegmentedTabs.Tab = Tab
