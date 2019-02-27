import { useState } from 'react'

import { Dropdown, Icon, PopperInstance } from '~/components'

import ICON_NOTIFICATION from '~/static/icons/notification.svg?sprite'

import DropdownNotices from './DropdownNotices'

const NoticesButton = () => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const [state, setState] = useState<'hidden' | 'shown'>('hidden')
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }
  const toggleDropdown = () => {
    if (!instance) {
      return
    }
    if (
      instance.state.isMounted ||
      instance.state.isShown ||
      instance.state.isVisible
    ) {
      instance.hide()
    } else {
      instance.show()
    }
  }

  return (
    <Dropdown
      content={<DropdownNotices hideDropdown={hideDropdown} state={state} />}
      zIndex={101}
      distance={12}
      trigger="manual"
      onShown={() => setState('shown')}
      onHidden={() => setState('hidden')}
      onCreate={i => setInstance(i)}
      theme="dropdown shadow-light"
    >
      <button type="button" aria-label="通知" onClick={toggleDropdown}>
        <Icon
          id={ICON_NOTIFICATION.id}
          viewBox={ICON_NOTIFICATION.viewBox}
          className="u-motion-icon-hover"
        />
      </button>
    </Dropdown>
  )
}

export default NoticesButton
