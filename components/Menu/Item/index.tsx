import classNames from 'classnames'
import React from 'react'

import styles from './styles.css'

type MenuItemSpacing = 'xtight' | 'tight' | 'default'

interface MenuItemProps {
  spacing?: [MenuItemSpacing, MenuItemSpacing]
  hoverBgColor?: 'green' | 'grey'

  className?: string
}

const Item: React.FC<MenuItemProps> = ({
  spacing = ['xtight', 'default'],
  hoverBgColor = 'grey-lighter',

  children
}) => {
  const itemClasses = classNames({
    item: true,
    [`spacing-vertical-${spacing[0]}`]: true,
    [`spacing-horizontal-${spacing[1]}`]: true,
    [`bg-hover-${hoverBgColor}`]: true
  })

  return (
    <li className={itemClasses} role="menuitem">
      {children}
      <style jsx>{styles}</style>
    </li>
  )
}

export default Item
