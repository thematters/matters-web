import React from 'react'

import styles from './styles.css'

interface MenuItemProps {
  title: string | React.ReactNode
}

const Item: React.FC<MenuItemProps> = ({ title, children }) => {
  return (
    <header>
      <h4>{title}</h4>
      {children}

      <style jsx>{styles}</style>
    </header>
  )
}

export default Item
