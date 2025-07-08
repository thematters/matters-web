import { NextRouter } from 'next/router'
import { useContext } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { FormattedMessage, useIntl } from 'react-intl'

import IconNavCreate from '@/public/static/icons/24px/nav-create.svg'
import IconNavSearch from '@/public/static/icons/24px/nav-search.svg'
import IconNavSearchActive from '@/public/static/icons/24px/nav-search-active.svg'
import IconLogo from '@/public/static/icons/logo.svg'
import { PATHS, TEST_ID, Z_INDEX } from '~/common/enums'
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
import type { Viewer } from '~/components/Context/Viewer'
import { Icon } from '~/components/Icon'
import { SearchBar } from '~/components/Search'

import MeAvatar from '../MeAvatar'
import ActivityPopover from './ActivityPopover'
import MeMenu from './MeMenu'
import NavButton from './NavButton'
import SideFooter from './SideFooter'
import styles from './styles.module.css'
import UnreadIcon from './UnreadIcon'

const Logo = () => {
  const intl = useIntl()

  return (
    <div className={styles.logo}>
      <Button
        href={`${PATHS.FEATURED}`}
        aria-label={intl.formatMessage({
          defaultMessage: 'Discover',
          id: 'cE4Hfw',
        })}
      >
        <Icon icon={IconLogo} />
      </Button>
    </div>
  )
}

const UnauthenticatedNav = () => (
  <>
    <LanguageSwitch size="lg" showText={false} />
    <UniversalAuthButton resideIn="sideNav" />
  </>
)

interface CreateButtonProps {
  openDropdown: () => void
  buttonRef?: React.ForwardedRef<HTMLButtonElement>
  iconSize: 26 | 30
}

const CreateButton = ({
  openDropdown,
  buttonRef,
  iconSize,
}: CreateButtonProps) => {
  return (
    <NavButton
      icon={<Icon icon={IconNavCreate} size={iconSize} />}
      activeIcon={<Icon icon={IconNavCreate} size={iconSize} />}
      onClick={openDropdown}
      name={<FormattedMessage defaultMessage="Create" id="VzzYJk" />}
      active={false}
      canScrollTop={false}
      showTooltip={false}
      aria-haspopup="menu"
      ref={buttonRef}
    />
  )
}

interface NotificationButtonProps {
  isInNotification: boolean
  iconSize: 26 | 30
}

const NotificationButton = ({
  isInNotification,
  iconSize,
}: NotificationButtonProps) => (
  <NavButton
    name={<FormattedMessage defaultMessage="Notifications" id="NAidKb" />}
    icon={
      <section className={styles.notificationIcon}>
        <UnreadIcon.Notification iconSize={iconSize} />
      </section>
    }
    activeIcon={
      <section className={styles.notificationIcon}>
        <UnreadIcon.Notification iconSize={iconSize} active />
      </section>
    }
    active={isInNotification}
    href={PATHS.ME_NOTIFICATIONS}
    showTooltip={false}
    testId={TEST_ID.GLOBAL_NAV_NOTIFICATIONS}
  />
)

interface UserMenuProps {
  viewer: Viewer
  avatarSize: 26 | 30
}

const UserMenu = ({ viewer, avatarSize }: UserMenuProps) => {
  const intl = useIntl()
  const { visuallyHiddenProps } = useVisuallyHidden()

  return (
    <Dropdown
      content={
        <section>
          <button type="button" {...visuallyHiddenProps}>
            <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
          </button>
          <MeMenu />
          <SideFooter />
        </section>
      }
      placement="bottom-start"
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
          testId={TEST_ID.GLOBAL_NAV_MY_PAGE}
        >
          <MeAvatar user={viewer} size={avatarSize} />
        </Button>
      )}
    </Dropdown>
  )
}

interface MobileSearchButtonProps {
  isInSearch: boolean
  router: NextRouter
}

const MobileSearchButton = ({
  isInSearch,
  router,
}: MobileSearchButtonProps) => (
  <NavButton
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
)

interface AuthenticatedNavProps {
  viewer: Viewer
  isInNotification: boolean
  iconSize: 26 | 30
  avatarSize: 26 | 30
}

const AuthenticatedNav = ({
  viewer,
  isInNotification,
  iconSize,
  avatarSize,
}: AuthenticatedNavProps) => (
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
    >
      {({ openDropdown, ref }) => (
        <CreateButton
          openDropdown={openDropdown}
          buttonRef={ref}
          iconSize={iconSize}
        />
      )}
    </Dropdown>

    <NotificationButton
      isInNotification={isInNotification}
      iconSize={iconSize}
    />
    <UserMenu viewer={viewer} avatarSize={avatarSize} />
  </>
)

interface BaseGlobalNavProps {
  showSearchBar?: boolean
  iconSize: 26 | 30
  avatarSize: 26 | 30
}

const BaseGlobalNav = ({
  showSearchBar = false,
  iconSize,
  avatarSize,
}: BaseGlobalNavProps) => {
  const { router, isInPath } = useRoute()
  const viewer = useContext(ViewerContext)
  const isInNotification = isInPath('ME_NOTIFICATIONS')
  const isInSearch = isInPath('SEARCH')
  const isAuthed = viewer.isAuthed

  return (
    <section className={styles.content}>
      <section className={styles.left}>
        <Logo />

        {showSearchBar && (
          <div className={styles.search}>
            <SearchBar />
          </div>
        )}
      </section>
      <section className={styles.right}>
        {!showSearchBar && (
          <MobileSearchButton isInSearch={isInSearch} router={router} />
        )}

        {!isAuthed ? (
          <UnauthenticatedNav />
        ) : (
          <AuthenticatedNav
            viewer={viewer}
            isInNotification={isInNotification}
            iconSize={iconSize}
            avatarSize={avatarSize}
          />
        )}
      </section>
    </section>
  )
}

export const GlobalNav = () => {
  return (
    <section className={styles.container}>
      <Media lessThan="md">
        <BaseGlobalNav showSearchBar={false} iconSize={26} avatarSize={26} />
      </Media>
      <Media greaterThanOrEqual="md">
        <BaseGlobalNav showSearchBar={true} iconSize={30} avatarSize={30} />
      </Media>
    </section>
  )
}
