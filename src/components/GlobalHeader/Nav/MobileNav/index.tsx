import classNames from 'classnames'
import { useState } from 'react'

import { Dropdown, Icon, PopperInstance } from '~/components'

import DropdownContent from './DropdownContent'
import styles from './styles.css'

const MobileNav = ({ unread }: { unread: boolean }) => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }
  const navButtonClass = classNames({
    'nav-button': true,
    unread
  })

  return (
    <Dropdown
      content={<DropdownContent hideDropdown={hideDropdown} unread={unread} />}
      distance={8}
      theme="dropdown shadow-default"
      onCreate={setInstance}
    >
      <button type="button" aria-label="菜單" className={navButtonClass}>
        <Icon.Menu style={{ width: 20, height: 16 }} />

        <style jsx>{styles}</style>
      </button>
    </Dropdown>
  )
}

export default MobileNav
