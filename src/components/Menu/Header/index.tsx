import classNames from 'classnames'
import React from 'react'

import styles from './styles.module.css'

interface MenuHeaderProps {
  title: string | React.ReactNode
  size?: 'md-s' | 'lg'
}

const MenuHeader: React.FC<React.PropsWithChildren<MenuHeaderProps>> = ({
  title,
  size = 'md-s',
  children,
}) => {
  const titleClasses = classNames({
    [`size-${size}`]: !!size,
  })

  return (
    <header>
      <h3 className={titleClasses}>{title}</h3>
      {children}
    </header>
  )
}

export default MenuHeader
