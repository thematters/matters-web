import classNames from 'classnames'
import React from 'react'

import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

interface MenuHeaderProps {
  title: string | React.ReactNode
  size?: 'mdS' | 'lg'
}

const MenuHeader: React.FC<React.PropsWithChildren<MenuHeaderProps>> = ({
  title,
  size = 'mdS',
  children,
}) => {
  const titleClasses = classNames({
    [styles[`size${capitalizeFirstLetter(size)}`]]: !!size,
  })

  return (
    <header className={styles.header}>
      <h3 className={titleClasses}>{title}</h3>
      {children}
    </header>
  )
}

export default MenuHeader
