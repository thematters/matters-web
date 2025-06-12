import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconCircleTimes from '@/public/static/icons/24px/circle-times.svg'
import IconNavCreate from '@/public/static/icons/24px/nav-create.svg'
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HAS_SHOW_MOMENT_BANNER,
} from '~/common/enums'
import { storage } from '~/common/utils'
import {
  Dropdown,
  hidePopperOnClick,
  Icon,
  toast,
  useDialogSwitch,
  ViewerContext,
} from '~/components'

import SideNavNavListItem from '../SideNav/NavListItem'
import MomentNavBanner from './MomentNavBanner'
import NavPopover from './NavPopover'

export const NavCreate = () => {
  const viewer = useContext(ViewerContext)

  const { show: showMomentBanner, closeDialog: _closeMomentBanner } =
    useDialogSwitch(!storage.get(viewer.id + HAS_SHOW_MOMENT_BANNER))

  const closeMomentBanner = () => {
    _closeMomentBanner()
    storage.set(viewer.id + HAS_SHOW_MOMENT_BANNER, true)
  }

  const {
    show: showWriteDropdown,
    openDialog: openWriteDropdown,
    closeDialog: closeWriteDropdown,
  } = useDialogSwitch(false)

  const toggleWriteDropdown = () =>
    showWriteDropdown ? closeWriteDropdown() : openWriteDropdown()

  return (
    <Dropdown
      arrow={true}
      onHidden={closeMomentBanner}
      visible={showMomentBanner}
      content={
        <MomentNavBanner
          onClick={() => {
            closeMomentBanner()
            openWriteDropdown()
          }}
        />
      }
      placement="top"
      onShown={hidePopperOnClick}
      offset={[0, 12]} // 16px - 4px (default tippy padding)
      theme="banner"
      appendTo="parent"
    >
      {({ ref: bannerRef }) => (
        <Dropdown
          arrow={true}
          onHidden={closeWriteDropdown}
          onClickOutside={closeWriteDropdown}
          visible={showWriteDropdown}
          content={<NavPopover />}
          placement="top"
          onShown={hidePopperOnClick}
          offset={[0, 12]} // 16px - 4px (default tippy padding)
          theme="mobile"
          appendTo="parent"
        >
          {({ ref: navRef }) => (
            <span ref={bannerRef}>
              <SideNavNavListItem
                onClick={() => {
                  if (viewer.isInactive) {
                    toast.error({
                      message: (
                        <FormattedMessage
                          {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]}
                        />
                      ),
                    })

                    return
                  }

                  if (showMomentBanner) {
                    closeMomentBanner()
                  }

                  toggleWriteDropdown()
                }}
                name={<FormattedMessage defaultMessage="Create" id="VzzYJk" />}
                icon={<Icon icon={IconNavCreate} size={32} />}
                activeIcon={<Icon icon={IconCircleTimes} size={32} />}
                active={showWriteDropdown}
                aria-haspopup="menu"
                canScrollTop={false}
                showTooltip={false}
                ref={navRef}
              />
            </span>
          )}
        </Dropdown>
      )}
    </Dropdown>
  )
}
