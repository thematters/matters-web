import classNames from 'classnames'

import Divider from './Divider'
import Header from './Header'
import Item from './Item'
import styles from './styles.css'

interface MenuProps {
  width?: 'sm' | 'md'
  spacingY?: 'xtight' | 0
}

export const Menu: React.FC<MenuProps> & {
  Item: typeof Item
  Divider: typeof Divider
  Header: typeof Header
} = ({ width, spacingY = 'xtight', children }) => {
  const menuClass = classNames({
    menu: true,
    [`width-${width}`]: !!width,
    [`spacing-y-${spacingY}`]: !!spacingY
  })

  return (
    <ul className={menuClass} role="menu">
      {children}
      <style jsx>{styles}</style>
    </ul>
  )
}

Menu.Item = Item
Menu.Divider = Divider
Menu.Header = Header
