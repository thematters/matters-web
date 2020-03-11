import React from 'react'

import styles from './styles.css'

interface MenuHeaderProps {
  title: string | React.ReactNode
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ title, children }) => {
  return (
    <header>
      <h4>{title}</h4>
      {children}

      <style jsx>{styles}</style>
    </header>
  )
}

export default MenuHeader
