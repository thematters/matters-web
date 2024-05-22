import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'

import Divider from './Divider'
import Item from './Item'
import styles from './styles.module.css'

interface MenuProps {
  width?: 'md'
}

export const Menu: React.FC<React.PropsWithChildren<MenuProps>> & {
  Item: typeof Item
  Divider: typeof Divider
} = ({ width, children }) => {
  const menuClasses = classNames({
    [styles.menu]: true,
    [width ? styles[`width${capitalizeFirstLetter(width)}`] : '']: !!width,
  })

  return (
    <ul className={menuClasses} role="menu">
      {children}
    </ul>
  )
}

Menu.Item = Item
Menu.Divider = Divider
