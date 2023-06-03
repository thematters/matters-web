import classNames from 'classnames'

import Divider from './Divider'
import Header from './Header'
import Item from './Item'
import styles from './styles.module.css'

interface MenuProps {
  width?: 'sm' | 'md'
  spacingY?: 'xtight' | 0
}

export const Menu: React.FC<React.PropsWithChildren<MenuProps>> & {
  Item: typeof Item
  Divider: typeof Divider
  Header: typeof Header
} = ({ width, spacingY = 'xtight', children }) => {
  const menuClasses = classNames({
    menu: true,
    [`width-${width}`]: !!width,
    [`spacing-y-${spacingY}`]: !!spacingY,
  })

  return (
    <ul className={menuClasses} role="menu">
      {children}
    </ul>
  )
}

Menu.Item = Item
Menu.Divider = Divider
Menu.Header = Header
