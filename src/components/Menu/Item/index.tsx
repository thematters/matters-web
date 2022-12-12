import React from 'react'

import { Card, CardProps } from '~/components'

type MenuItemProps = CardProps

const MenuItem: React.FC<React.PropsWithChildren<MenuItemProps>> = ({
  children,
  spacing = ['tight', 'base'],
  ...restProps
}) => {
  return (
    <li role="menuitem">
      <Card spacing={spacing} {...restProps}>
        {children}
      </Card>
    </li>
  )
}

export default MenuItem
