import { useState } from 'react'

import { Dropdown, Icon, PopperInstance } from '~/components'

import ICON_MENU from '~/static/icons/menu.svg?sprite'

import DropdownContent from './DropdownContent'
import styles from './styles.css'

export default () => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  return (
    <Dropdown
      content={<DropdownContent hideDropdown={hideDropdown} />}
      distance={8}
      theme="dropdown shadow-default"
      onCreate={setInstance}
      zIndex={101}
    >
      <button type="button" aria-label="菜單" className="nav-button">
        <Icon
          id={ICON_MENU.id}
          viewBox={ICON_MENU.viewBox}
          style={{ width: 20, height: 16 }}
        />
        <style jsx>{styles}</style>
      </button>
    </Dropdown>
  )
}
