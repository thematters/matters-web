import React from 'react'

import styles from './styles.css'

interface MenuItemProps {
  title: string | React.ReactNode
}

const Item: React.FC<MenuItemProps> = ({ title, children }) => {
  return (
    <li>
      <header>
        <span className="title">{title}</span>
        {children}
      </header>

      <style jsx>{styles}</style>
    </li>
  )
}

export default Item
