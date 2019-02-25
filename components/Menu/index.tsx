import classNames from 'classnames'
import React from 'react'

import Divider from './Divider'
import Header from './Header'
import Item from './Item'
import styles from './styles.css'

interface MenuProps {
  width?: '168px' | '100%'
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
      width = '168px',
      spacing = 'xxxtight',
      className,
      style,
      children
    } = this.props

    const menuClasses = classNames({
      menu: true,
      [`spacing-${spacing}`]: true,
      [className || '']: !!className
    })

    return (
      <>
        <ul className={menuClasses} style={{ width, ...style }} role="menu">
          {children}
        </ul>
        <style jsx>{styles}</style>
      </>
    )
  }
}
