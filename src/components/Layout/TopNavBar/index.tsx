import { VisuallyHidden } from '@reach/visually-hidden'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconNavCreate } from '@/public/static/icons/24px/nav-create.svg'
import { ReactComponent as IconNavSearch } from '@/public/static/icons/24px/nav-search.svg'
import { ReactComponent as IconNavSearchActive } from '@/public/static/icons/24px/nav-search-active.svg'
import { ReactComponent as IconLogo } from '@/public/static/icons/logo.svg'
import { PATHS, Z_INDEX } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Button,
  Dropdown,
  hidePopperOnClick,
  LanguageSwitch,
  Media,
  UniversalAuthButton,
  useRoute,
  ViewerContext,
} from '~/components'
import { Icon } from '~/components/Icon'
import { SearchBar } from '~/components/Search'

import MeAvatar from '../MeAvatar'
import SideFooter from '../SideFooter'
import ActivityPopover from '../SideNav/Activity'
import MeMenu from '../SideNav/MeMenu'
import { NavListItemButton } from '../SideNav/NavListItem'
import UnreadIcon from '../UnreadIcon'
import styles from './styles.module.css'

export const TopNavBar = () => {
  const { router, isInPath } = useRoute()
  const viewer = useContext(ViewerContext)
  const intl = useIntl()
  const isInNotification = isInPath('ME_NOTIFICATIONS')
  const isInSearch = isInPath('SEARCH')
  const isAuthed = viewer.isAuthed

  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <div className={styles.logo}>
          <Icon icon={IconLogo} />
        </div>
        <Media greaterThan="sm">
          <div className={styles.search}>
            <SearchBar />
          </div>
        </Media>
      </section>
      <section className={styles.right}>
        <Media at="sm">
          <NavListItemButton
            name={<FormattedMessage defaultMessage="Search" id="xmcVZ0" />}
            icon={<Icon icon={IconNavSearch} size={24} />}
            activeIcon={<Icon icon={IconNavSearchActive} size={24} />}
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
        </Media>
        {!isAuthed && (
          <>
            <LanguageSwitch size="lg" showText={false} />
            <UniversalAuthButton resideIn="sideNav" />
          </>
        )}
        {isAuthed && (
          <>
            <Dropdown
              content={
                <section>
                  <ActivityPopover
                    authed={viewer.isAuthed}
                    forbidden={viewer.isInactive}
                  />
                </section>
              }
              placement="bottom-start"
              // offset={[-16, 16]}
            >
              {({ openDropdown, ref }) => (
                <>
                  <Media at="sm">
                    <NavListItemButton
                      onClick={() => {
                        openDropdown()
                      }}
                      name={
                        <FormattedMessage defaultMessage="Create" id="VzzYJk" />
                      }
                      icon={<Icon icon={IconNavCreate} size={24} />}
                      activeIcon={<Icon icon={IconNavCreate} size={24} />}
                      active={false}
                      canScrollTop={false}
                      aria-haspopup="menu"
                      ref={ref}
                    />
                  </Media>
                  <Media greaterThan="sm">
                    <NavListItemButton
                      onClick={() => {
                        openDropdown()
                      }}
                      name={
                        <FormattedMessage defaultMessage="Create" id="VzzYJk" />
                      }
                      icon={<Icon icon={IconNavCreate} size={28} />}
                      activeIcon={<Icon icon={IconNavCreate} size={28} />}
                      active={false}
                      canScrollTop={false}
                      aria-haspopup="menu"
                      ref={ref}
                    />
                  </Media>
                </>
              )}
            </Dropdown>

            {/* <Media at="sm"> */}
            <NavListItemButton
              name={
                <FormattedMessage defaultMessage="Notifications" id="NAidKb" />
              }
              icon={
                <section className={styles.notificationIcon}>
                  <Media at="sm">
                    <UnreadIcon.Notification />
                  </Media>
                  <Media greaterThan="sm">
                    <UnreadIcon.Notification iconSize={28} />
                  </Media>
                </section>
              }
              activeIcon={
                <section className={styles.notificationIcon}>
                  <Media at="sm">
                    <UnreadIcon.Notification active />
                  </Media>
                  <Media greaterThan="sm">
                    <UnreadIcon.Notification active iconSize={28} />
                  </Media>
                </section>
              }
              active={isInNotification}
              href={PATHS.ME_NOTIFICATIONS}
            />
            <Dropdown
              content={
                <section>
                  <VisuallyHidden>
                    <button type="button">
                      <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                    </button>
                  </VisuallyHidden>
                  <MeMenu />
                  <SideFooter />
                </section>
              }
              placement="bottom-start"
              // offset={[-16, 16]}
              zIndex={Z_INDEX.OVER_BOTTOM_BAR}
              onShown={hidePopperOnClick}
            >
              {({ openDropdown, ref }) => (
                <Button
                  ref={ref}
                  onClick={openDropdown}
                  aria-label={intl.formatMessage({
                    defaultMessage: 'My Page',
                    id: 'enMIYK',
                  })}
                >
                  <Media at="sm">
                    <MeAvatar user={viewer} size={24} />
                  </Media>
                  <Media greaterThan="sm">
                    <MeAvatar user={viewer} size={30} />
                  </Media>
                </Button>
              )}
            </Dropdown>
          </>
        )}
      </section>
    </div>
  )
}
