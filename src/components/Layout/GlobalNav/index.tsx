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

export const GlobalNav = () => {
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
          <Button
            href={`${PATHS.HOME}?type=icymi`}
            aria-label={intl.formatMessage({
              defaultMessage: 'Discover',
              id: 'cE4Hfw',
            })}
          >
            <Icon icon={IconLogo} />
          </Button>
        </div>
        <Media greaterThan="sm">
          <div className={styles.search}>
            <SearchBar />
          </div>
        </Media>
      </section>
      <section className={styles.right}>
        <Media lessThan="md">
          <NavListItemButton
            name={<FormattedMessage defaultMessage="Search" id="xmcVZ0" />}
            showTooltip={false}
            icon={<Icon icon={IconNavSearch} size={26} />}
            activeIcon={<Icon icon={IconNavSearchActive} size={26} />}
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
              // offset={[-16, 16]}
            >
              {({ openDropdown, ref }) => (
                <>
                  <Media lessThan="md">
                    <NavListItemButton
                      onClick={() => {
                        openDropdown()
                      }}
                      name={
                        <FormattedMessage defaultMessage="Create" id="VzzYJk" />
                      }
                      icon={<Icon icon={IconNavCreate} size={26} />}
                      activeIcon={<Icon icon={IconNavCreate} size={26} />}
                      active={false}
                      canScrollTop={false}
                      showTooltip={false}
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
                      icon={<Icon icon={IconNavCreate} size={30} />}
                      activeIcon={<Icon icon={IconNavCreate} size={30} />}
                      active={false}
                      canScrollTop={false}
                      showTooltip={false}
                      aria-haspopup="menu"
                      ref={ref}
                    />
                  </Media>
                </>
              )}
            </Dropdown>

            {/* <Media lessThan="md"> */}
            <NavListItemButton
              name={
                <FormattedMessage defaultMessage="Notifications" id="NAidKb" />
              }
              icon={
                <section className={styles.notificationIcon}>
                  <Media lessThan="md">
                    <UnreadIcon.Notification iconSize={26} />
                  </Media>
                  <Media greaterThan="sm">
                    <UnreadIcon.Notification iconSize={30} />
                  </Media>
                </section>
              }
              activeIcon={
                <section className={styles.notificationIcon}>
                  <Media lessThan="md">
                    <UnreadIcon.Notification iconSize={26} active />
                  </Media>
                  <Media greaterThan="sm">
                    <UnreadIcon.Notification active iconSize={30} />
                  </Media>
                </section>
              }
              active={isInNotification}
              href={PATHS.ME_NOTIFICATIONS}
              showTooltip={false}
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
                  <Media lessThan="md">
                    <MeAvatar user={viewer} size={26} />
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
