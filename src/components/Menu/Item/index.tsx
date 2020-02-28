import classNames from 'classnames'
import React from 'react'

import { Card, CardProps } from '~/components'

import styles from './styles.css'

type MenuItemProps = {} & CardProps

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  spacing = ['tight', 'base'],
  bgHoverColor = 'grey-lighter',
  ...restProps
}) => {
  const menuItemClass = classNames({
    'menu-item': true
  })

  return (
    <li className={menuItemClass} role="menuitem">
      <Card spacing={spacing} bgHoverColor={bgHoverColor} {...restProps}>
        {children}
      </Card>

      <style jsx>{styles}</style>
    </li>
  )
}

export default MenuItem
