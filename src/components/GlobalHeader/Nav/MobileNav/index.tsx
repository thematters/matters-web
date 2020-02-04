import classNames from 'classnames'
import { useState } from 'react'

import { Button, Dropdown, Icon, PopperInstance } from '~/components'

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
      <Button
        size={['2rem', '2rem']}
        bgHoverColor="grey-lighter"
        aria-label="菜單"
        aria-haspopup="true"
      >
        <span className={navButtonClass}>
          <Icon.Menu color="black" />
        </span>

        <style jsx>{styles}</style>
      </Button>
    </Dropdown>
  )
}

export default MobileNav
