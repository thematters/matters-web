import classNames from 'classnames'
import React from 'react'

import styles from './styles.css'

interface MenuHeaderProps {
  title: string | React.ReactNode
  size?: 'md-s' | 'lg'
}

const MenuHeader: React.FC<MenuHeaderProps> = ({
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

      <style jsx>{styles}</style>
    </header>
  )
}

export default MenuHeader
