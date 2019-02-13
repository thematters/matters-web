import classNames from 'classnames'
import React from 'react'

import styles from './styles.css'

type MenuItemSpacing = 'xtight' | 'tight' | 'default'

interface MenuItemProps {
  spacing?: [MenuItemSpacing, MenuItemSpacing]
  hoverBgColor?: 'green-lighter' | 'grey-lighter'

  className?: string
}

const Item: React.SFC<MenuItemProps> = ({
  spacing = ['tight', 'default'],
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
    <>
      <button type="button" className={itemClasses}>
        {children}
      </button>
      <style jsx>{styles}</style>
    </>
  )
}

export default Item
