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
  spacing = [8, 16],
  weight,
  size = 16,
  ...restProps
}) => {
  return (
    <li className={styles.menuItem}>
      <Card
        spacing={spacing}
        textColor="greyDarker"
        textActiveColor="black"
        bgColor="transparent"
        role="menuitem"
        {...restProps}
      >
        {children || (
          <div className={styles.content}>
            <TextIcon icon={icon} size={size} spacing={8} weight={weight}>
              {text}
            </TextIcon>
          </div>
        )}
      </Card>
    </li>
  )
}

export default MenuItem
