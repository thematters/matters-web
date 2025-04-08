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

const Logo = () => {
  const intl = useIntl()

  return (
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
  buttonRef?: React.Ref<any>
}

const CreateButton = ({ openDropdown, buttonRef }: CreateButtonProps) => (
  <>
    <Media lessThan="md">
      <NavListItemButton
        onClick={openDropdown}
        name={<FormattedMessage defaultMessage="Create" id="VzzYJk" />}
        icon={<Icon icon={IconNavCreate} size={26} />}
        activeIcon={<Icon icon={IconNavCreate} size={26} />}
        active={false}
        canScrollTop={false}
        showTooltip={false}
        aria-haspopup="menu"
        ref={buttonRef}
      />
    </Media>
    <Media greaterThanOrEqual="md">
      <NavListItemButton
        onClick={openDropdown}
        name={<FormattedMessage defaultMessage="Create" id="VzzYJk" />}
        icon={<Icon icon={IconNavCreate} size={30} />}
        activeIcon={<Icon icon={IconNavCreate} size={30} />}
        active={false}
        canScrollTop={false}
        showTooltip={false}
        aria-haspopup="menu"
        ref={buttonRef}
      />
    </Media>
  </>
)

interface NotificationButtonProps {
  isInNotification: boolean
}

const NotificationButton = ({ isInNotification }: NotificationButtonProps) => (
  <NavListItemButton
    name={<FormattedMessage defaultMessage="Notifications" id="NAidKb" />}
    icon={
      <section className={styles.notificationIcon}>
        <Media lessThan="md">
          <UnreadIcon.Notification iconSize={26} />
        </Media>
        <Media greaterThanOrEqual="md">
          <UnreadIcon.Notification iconSize={30} />
        </Media>
      </section>
    }
    activeIcon={
      <section className={styles.notificationIcon}>
        <Media lessThan="md">
          <UnreadIcon.Notification iconSize={26} active />
        </Media>
        <Media greaterThanOrEqual="md">
          <UnreadIcon.Notification active iconSize={30} />
        </Media>
      </section>
    }
    active={isInNotification}
    href={PATHS.ME_NOTIFICATIONS}
    showTooltip={false}
  />
)

interface UserMenuProps {
  viewer: any
}

const UserMenu = ({ viewer }: UserMenuProps) => {
  const intl = useIntl()

  return (
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
          <Media greaterThanOrEqual="md">
            <MeAvatar user={viewer} size={30} />
          </Media>
        </Button>
      )}
    </Dropdown>
  )
}

interface MobileSearchButtonProps {
  isInSearch: boolean
  router: any
}

const MobileSearchButton = ({
  isInSearch,
  router,
}: MobileSearchButtonProps) => (
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
)

interface AuthenticatedNavProps {
  viewer: any
  isInNotification: boolean
}

const AuthenticatedNav = ({
  viewer,
  isInNotification,
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
    >
      {({ openDropdown, ref }) => (
        <CreateButton openDropdown={openDropdown} buttonRef={ref} />
      )}
    </Dropdown>

    <NotificationButton isInNotification={isInNotification} />
    <UserMenu viewer={viewer} />
  </>
)

export const GlobalNav = () => {
  const { router, isInPath } = useRoute()
  const viewer = useContext(ViewerContext)
  const isInNotification = isInPath('ME_NOTIFICATIONS')
  const isInSearch = isInPath('SEARCH')
  const isAuthed = viewer.isAuthed

  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <Logo />
        <Media greaterThanOrEqual="md">
          <div className={styles.search}>
            <SearchBar />
          </div>
        </Media>
      </section>
      <section className={styles.right}>
        <MobileSearchButton isInSearch={isInSearch} router={router} />
        {!isAuthed ? (
          <UnauthenticatedNav />
        ) : (
          <AuthenticatedNav
            viewer={viewer}
            isInNotification={isInNotification}
          />
        )}
      </section>
    </div>
  )
}
