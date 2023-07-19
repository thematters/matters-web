import React from 'react'

import { Card, CardProps, TextIcon, TextIconProps } from '~/components'

export type MenuItemProps = {
  text?: React.ReactNode
  icon?: React.ReactNode
} & CardProps &
  Pick<TextIconProps, 'weight' | 'size'>

import styles from './styles.module.css'

const MenuItem: React.FC<React.PropsWithChildren<MenuItemProps>> = ({
  text,
  icon,
  children,
  spacing = ['baseTight', 'base'],
  weight,
  size = 'md',
  ...restProps
}) => {
  return (
    <li role="menuitem" className={styles.menuItem}>
      <Card
        spacing={spacing}
        textColor="greyDarker"
        textActiveColor="black"
        {...restProps}
      >
        <div className={styles.content}>
          {children || (
            <TextIcon icon={icon} size={size} spacing="tight" weight={weight}>
              {text}
            </TextIcon>
          )}
        </div>
      </Card>
    </li>
  )
}

export default MenuItem
