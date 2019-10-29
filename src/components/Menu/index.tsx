import classNames from 'classnames'
import React from 'react'

import Divider from './Divider'
import Header from './Header'
import Item from './Item'
import styles from './styles.css'

interface MenuProps {
  width?: 'sm' | 'full' | 'md'
  spacing?: '0' | 'xxxtight' | 'xxtight'

  style?: React.CSSProperties
  className?: string
}

export class Menu extends React.PureComponent<MenuProps> {
  public static Item = Item
  public static Divider = Divider
  public static Header = Header

  public render() {
    const {
      width = 'sm',
      spacing = 'xxtight',
      className,
      style,
      children
    } = this.props

    const menuClasses = classNames({
      menu: true,
      [`width-${width}`]: true,
      [`spacing-${spacing}`]: true,
      [className || '']: !!className
    })

    return (
      <ul className={menuClasses} style={style} role="menu">
        {children}

        <style jsx>{styles}</style>
      </ul>
    )
  }
}
