import classNames from 'classnames'

import { Button, Dropdown, Icon } from '~/components'

import { Z_INDEX } from '~/common/enums'

import DropdownContent from './DropdownContent'
import styles from './styles.css'

const MobileNav = ({ unread }: { unread: boolean }) => {
  const navButtonClass = classNames({
    'nav-button': true,
    unread
  })

  return (
    <Dropdown
      content={<DropdownContent unread={unread} />}
      distance={8}
      theme="dropdown shadow-default"
      zIndex={Z_INDEX.OVER_GLOBAL_HEADER}
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
