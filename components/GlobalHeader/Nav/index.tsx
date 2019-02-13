import Tippy from '@tippy.js/react'
import React, { forwardRef } from 'react'

import { Icon, Menu } from '~/components'
import ICON_MENU from '~/static/icons/menu.svg?sprite'
import styles from './styles.css'

const DropdonwContent = () => (
  <>
    <Menu>
      <Menu.Item>發現</Menu.Item>
      <Menu.Item>追蹤</Menu.Item>
    </Menu>
    <style jsx>{styles}</style>
  </>
)

const MobileNav = forwardRef((props, ref) => {
  return (
    <>
      <button ref={ref}>
        <Icon
          id={ICON_MENU.id}
          viewBox={ICON_MENU.viewBox}
          style={{ width: 20, height: 16 }}
        />
      </button>
      <style jsx>{styles}</style>
    </>
  )
})

export default () => (
  <Tippy content={<DropdonwContent />} trigger="click" interactive>
    <MobileNav />
  </Tippy>
)
