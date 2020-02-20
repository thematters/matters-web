import classNames from 'classnames'

import { Button, DropdownDialog, Icon, Translate } from '~/components'

import { Z_INDEX } from '~/common/enums'

import DropdownContent from './DropdownContent'
import styles from './styles.css'

const MobileNav = ({ unread }: { unread: boolean }) => {
  const navButtonClass = classNames({
    'nav-button': true,
    unread
  })

  return (
    <DropdownDialog
      dropdown={{
        content: <DropdownContent type="dropdown" unread={unread} />,
        theme: 'dropdown shadow-default',
        zIndex: Z_INDEX.OVER_GLOBAL_HEADER
      }}
      dialog={{
        content: <DropdownContent type="dialog" unread={unread} />,
        title: <Translate zh_hant="菜單" zh_hans="菜单" />,
        showHeader: false
      }}
    >
      {({ open, ref }) => (
        <Button
          size={['2rem', '2rem']}
          bgHoverColor="grey-lighter"
          aria-label="菜單"
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <span className={navButtonClass}>
            <Icon.Menu color="black" />
          </span>

          <style jsx>{styles}</style>
        </Button>
      )}
    </DropdownDialog>
  )
}

export default MobileNav
