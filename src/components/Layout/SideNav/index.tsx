import { useContext } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconNavCreate } from '@/public/static/icons/24px/nav-create.svg'
import { ReactComponent as IconNavUser } from '@/public/static/icons/24px/nav-user.svg'
import { ReactComponent as IconNavUserActive } from '@/public/static/icons/24px/nav-user-active.svg'
import { PATHS, TEST_ID, Z_INDEX } from '~/common/enums'
import {
  Dropdown,
  hidePopperOnClick,
  Icon,
  Media,
  UniversalAuthButton,
  useRoute,
  ViewerContext,
} from '~/components'

import UnreadIcon from '../UnreadIcon'
import ActivityPopover from './Activity'
import { NavListItemHome, NavListItemSearch } from './Items'
import Logo from './Logo'
import MeMenu from './MeMenu'
import NavListItem from './NavListItem'
import styles from './styles.module.css'

const SideNavMenu = () => {
  const { isInPath, isPathStartWith, getQuery } = useRoute()
  const viewer = useContext(ViewerContext)

  const { visuallyHiddenProps } = useVisuallyHidden()

  const name = getQuery('name')
  const viewerUserName = viewer.userName || ''
  const viewerCircle = viewer.ownCircles && viewer.ownCircles[0]

  const isInFollow = isInPath('FOLLOW')
  const isInNotification = isInPath('ME_NOTIFICATIONS')

  const isMyProfile = isPathStartWith('/@', true) && name === viewerUserName
  const isMyCircle = isPathStartWith('/~', true) && name === viewerCircle?.name
  const isInMe =
    (!isInNotification && isPathStartWith('/me')) || isMyProfile || isMyCircle

  return (
    <ul role="menu" className={styles.list}>
      <NavListItemHome />

      <NavListItem
        name={
          <FormattedMessage
            defaultMessage="Following"
            id="32bml8"
            description="src/components/Layout/SideNav/index.tsx"
          />
        }
        icon={<UnreadIcon.Follow />}
        activeIcon={<UnreadIcon.Follow active />}
        active={isInFollow}
        href={PATHS.FOLLOW}
      />

      <NavListItem
        name={<FormattedMessage defaultMessage="Notifications" id="NAidKb" />}
        icon={<UnreadIcon.Notification />}
        activeIcon={<UnreadIcon.Notification active />}
        active={isInNotification}
        href={PATHS.ME_NOTIFICATIONS}
        testId={TEST_ID.SIDE_NAV_NOTIFICATIONS}
      />

      <Media lessThan="lg">
        <NavListItemSearch />
      </Media>

      <Dropdown
        content={
          <section>
            <button type="button" {...visuallyHiddenProps}>
              <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
            </button>
            <MeMenu />
          </section>
        }
        placement="right-start"
        offset={[-16, 16]}
        zIndex={Z_INDEX.OVER_BOTTOM_BAR}
        onShown={hidePopperOnClick}
      >
        {({ openDropdown, ref }) => (
          <NavListItem
            onClick={openDropdown}
            name={<FormattedMessage defaultMessage="My Page" id="enMIYK" />}
            icon={<Icon icon={IconNavUser} size={32} />}
            activeIcon={<Icon icon={IconNavUserActive} size={32} />}
            active={isInMe}
            canScrollTop={false}
            aria-haspopup="menu"
            ref={ref}
            testId={TEST_ID.SIDE_NAV_MY_PAGE}
          />
        )}
      </Dropdown>

      <Dropdown
        content={
          <section>
            <ActivityPopover
              authed={viewer.isAuthed}
              forbidden={viewer.isInactive}
            />
          </section>
        }
        placement="right-start"
        offset={[-16, 16]}
      >
        {({ openDropdown, ref }) => (
          <NavListItem
            onClick={() => {
              openDropdown()
            }}
            name={<FormattedMessage defaultMessage="Create" id="VzzYJk" />}
            icon={<Icon icon={IconNavCreate} size={32} />}
            activeIcon={<Icon icon={IconNavCreate} size={32} />}
            active={false}
            canScrollTop={false}
            aria-haspopup="menu"
            ref={ref}
          />
        )}
      </Dropdown>
    </ul>
  )
}

const VisitorSideNavMenu = () => {
  return (
    <ul role="menu" className={styles.list}>
      <Media lessThan="lg">
        <NavListItemHome />

        <NavListItemSearch />
      </Media>

      <li role="menuitem" className={styles.listItem}>
        <UniversalAuthButton resideIn="sideNav" />
      </li>
    </ul>
  )
}

const SideNav = () => {
  const viewer = useContext(ViewerContext)

  return (
    <section className={styles.sideNav}>
      <Logo />

      {viewer.isAuthed ? <SideNavMenu /> : <VisitorSideNavMenu />}
    </section>
  )
}

export default SideNav
