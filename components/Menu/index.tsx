import classNames from 'classnames'
import React from 'react'

import Divider from './Divider'
import Item from './Item'

import styles from './styles.css'

interface MenuProps {
  width?: '168px' | '100%'
  spacing?: '0' | 'xxxtight' | 'xxtight'
  shadow?: 'light' | 'default' | 'dark'

  style?: React.CSSProperties
  className?: string
}

export class Menu extends React.PureComponent<MenuProps> {
  public static Item = Item
  public static Divider = Divider

  public render() {
    const {
      width = '168px',
      spacing = 'xxxtight',
      shadow = 'default',

      className,
      style,
      children
    } = this.props

    const menuClasses = classNames({
      menu: true,
      [`spacing-${spacing}`]: true,
      [`shadow-${shadow}`]: true,
      [className || '']: !!className
    })

    return (
      <>
        <section className={menuClasses} style={{ width, ...style }}>
          {children}
        </section>
        <style jsx>{styles}</style>
      </>
    )
  }
}
