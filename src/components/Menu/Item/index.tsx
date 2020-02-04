import classNames from 'classnames'
import React from 'react'

import styles from './styles.css'

type MenuItemSpacing = 'xtight' | 'tight' | 'default'

interface MenuItemProps {
  spacing?: [MenuItemSpacing, MenuItemSpacing]
  hoverBgColor?: 'green' | 'grey'

  style?: React.CSSProperties
  className?: string
}

const Item: React.FC<MenuItemProps> = ({
  spacing = ['xtight', 'default'],
  hoverBgColor = 'grey',

  style,
  children
}) => {
  const itemClasses = classNames({
    item: true,
    [`spacing-y-${spacing[0]}`]: true,
    [`spacing-x-${spacing[1]}`]: true,
    [`bg-hover-${hoverBgColor}`]: true
  })

  return (
    <li className={itemClasses} style={style} role="menuitem" tabIndex={0}>
      {children}

      <style jsx>{styles}</style>
    </li>
  )
}

export default Item
