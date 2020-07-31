import classNames from 'classnames'
import React from 'react'

import { Card, CardProps } from '~/components'

type MenuItemProps = CardProps

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  spacing = ['tight', 'base'],
  ...restProps
}) => {
  const menuItemClasses = classNames({
    'menu-item': true,
  })

  return (
    <li className={menuItemClasses} role="menuitem">
      <Card spacing={spacing} {...restProps}>
        {children}
      </Card>
    </li>
  )
}

export default MenuItem
