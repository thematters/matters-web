import classNames from 'classnames'
import React from 'react'

import styles from './styles.module.css'

interface MenuDividerProps {
  isInSearch?: boolean
}

const MenuDivider: React.FC<MenuDividerProps> = ({ isInSearch }) => {
  return (
    <hr
      className={classNames({
        [styles.divider]: true,
        [styles.isInSearch]: isInSearch,
      })}
    />
  )
}

export default MenuDivider
