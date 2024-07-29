import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconCircleTimes } from '@/public/static/icons/24px/circle-times.svg'
import { ReactComponent as IconNavCreate } from '@/public/static/icons/24px/nav-create.svg'
import { ReactComponent as IconNavHome } from '@/public/static/icons/24px/nav-home.svg'
import { ReactComponent as IconNavHomeActive } from '@/public/static/icons/24px/nav-home-active.svg'
import { ReactComponent as IconNavSearch } from '@/public/static/icons/24px/nav-search.svg'
import { ReactComponent as IconNavSearchActive } from '@/public/static/icons/24px/nav-search-active.svg'
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HAS_SHOW_MOMENT_BANNER,
  PATHS,
} from '~/common/enums'
import { storage, toPath } from '~/common/utils'
import {
  Dropdown,
  hidePopperOnClick,
  Icon,
  toast,
  UniversalAuthButton,
  useDialogSwitch,
  useRoute,
  ViewerContext,
} from '~/components'

import SideNavNavListItem from '../SideNav/NavListItem'
import UnreadIcon from '../UnreadIcon'
import NavBanner from './NavBanner'
import NavListItem from './NavListItem'
import NavPopover from './NavPopover'
import styles from './styles.module.css'

const NavBar = () => {
  const viewer = useContext(ViewerContext)
  const { router, isInPath } = useRoute()
  const intl = useIntl()
  const isInHome = isInPath('HOME')
  const isInFollow = isInPath('FOLLOW')
  const isInNotification = isInPath('ME_NOTIFICATIONS')
  const isInSearch = isInPath('SEARCH')

  const { show: showMomentBanner, closeDialog: _closeMomentBanner } =
    useDialogSwitch(!storage.get(HAS_SHOW_MOMENT_BANNER))

  const closeMomentBanner = () => {
    _closeMomentBanner()
    storage.set(HAS_SHOW_MOMENT_BANNER, true)
  }

  const {
    show: showWriteDropdown,
    openDialog: openWriteDropdown,
    closeDialog: closeWriteDropdown,
  } = useDialogSwitch(false)

  const toggleWriteDropdown = () =>
    showWriteDropdown ? closeWriteDropdown() : openWriteDropdown()

  if (!viewer.isAuthed) {
    return (
      <section className={styles.navBar} role="navigation">
        <ul className={styles.list}>
          <NavListItem
            name={<FormattedMessage defaultMessage="Discover" id="cE4Hfw" />}
            icon={<Icon icon={IconNavHome} size={32} />}
            activeIcon={<Icon icon={IconNavHomeActive} size={32} />}
            active={isInHome}
            href={PATHS.HOME}
          />

          <li role="menuitem" className={styles.listItem}>
            <UniversalAuthButton resideIn="nav" />
          </li>

          <NavListItem
            name={<FormattedMessage defaultMessage="Search" id="xmcVZ0" />}
            icon={<Icon icon={IconNavSearch} size={32} />}
            activeIcon={<Icon icon={IconNavSearchActive} size={32} />}
            active={isInSearch}
            onClick={() => {
              const path = toPath({
                page: 'search',
              })

              if (isInSearch) {
                router.replace(path.href)
              } else {
                router.push(path.href)
              }
            }}
          />
        </ul>
      </section>
    )
  }

  return (
    <section className={styles.navBar} role="navigation">
      <ul className={styles.list}>
        <NavListItem
          name={<FormattedMessage defaultMessage="Discover" id="cE4Hfw" />}
          icon={<Icon icon={IconNavHome} size={32} />}
          activeIcon={<Icon icon={IconNavHomeActive} size={32} />}
          active={isInHome}
          href={PATHS.HOME}
        />

        <NavListItem
          name={<FormattedMessage defaultMessage="Follow" id="ieGrWo" />}
          icon={<UnreadIcon.Follow />}
          activeIcon={<UnreadIcon.Follow active />}
          active={isInFollow}
          href={PATHS.FOLLOW}
        />
        <Dropdown
          arrow={true}
          onHidden={closeMomentBanner}
          onClickOutside={closeMomentBanner}
          visible={showMomentBanner}
          content={<NavBanner />}
          placement="top"
          onShown={hidePopperOnClick}
          offset={[0, 12]} // 16px - 4px (default tippy padding)
          theme="banner"
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
            >
              {({ ref: navRef }) => (
                <span ref={bannerRef}>
                  <SideNavNavListItem
                    onClick={() => {
                      if (viewer.isInactive) {
                        toast.error({
                          message: (
                            <FormattedMessage
                              {...ERROR_MESSAGES[
                                ERROR_CODES.FORBIDDEN_BY_STATE
                              ]}
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
                    name={
                      <FormattedMessage defaultMessage="Create" id="VzzYJk" />
                    }
                    icon={<Icon icon={IconNavCreate} size={32} />}
                    activeIcon={<Icon icon={IconCircleTimes} size={32} />}
                    active={showWriteDropdown}
                    aria-haspopup="menu"
                    canScrollTop={false}
                    ref={navRef}
                  />
                </span>
              )}
            </Dropdown>
          )}
        </Dropdown>

        <NavListItem
          name={<FormattedMessage defaultMessage="Search" id="xmcVZ0" />}
          icon={<Icon icon={IconNavSearch} size={32} />}
          activeIcon={<Icon icon={IconNavSearchActive} size={32} />}
          active={isInSearch}
          onClick={() => {
            const path = toPath({
              page: 'search',
            })

            if (isInSearch) {
              router.replace(path.href)
            } else {
              router.push(path.href)
            }
          }}
        />

        <NavListItem
          name={<FormattedMessage defaultMessage="Notifications" id="NAidKb" />}
          icon={<UnreadIcon.Notification />}
          activeIcon={<UnreadIcon.Notification active />}
          active={isInNotification}
          href={PATHS.ME_NOTIFICATIONS}
          aria-label={intl.formatMessage({
            defaultMessage: 'Notifications',
            id: 'NAidKb',
          })}
        />
      </ul>
    </section>
  )
}

export default NavBar
