import { VisuallyHidden } from '@reach/visually-hidden'
import { useContext } from 'react'
import FocusLock from 'react-focus-lock'
import { FormattedMessage } from 'react-intl'

import { PATHS, Z_INDEX } from '~/common/enums'
import {
  Dropdown,
  hidePopperOnClick,
  IconNavMe32,
  IconNavMeActive32,
  Media,
  Menu,
  UniversalAuthButton,
  useRoute,
  ViewerContext,
  WriteButton,
} from '~/components'

import NavMenu from '../NavMenu'
import UnreadIcon from '../UnreadIcon'
import { NavListItemHome, NavListItemSearch } from './Items'
import Logo from './Logo'
import NavListItem from './NavListItem'
import styles from './styles.module.css'

const SideNavMenu = ({ isMdUp }: { isMdUp: boolean }) => {
  const { isInPath, isPathStartWith, getQuery } = useRoute()
  const viewer = useContext(ViewerContext)

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
      <NavListItemHome isMdUp={isMdUp} />

      <NavListItem
        name={
          <FormattedMessage
            defaultMessage="Following"
            description="src/components/Layout/SideNav/index.tsx"
          />
        }
        icon={<UnreadIcon.Follow />}
        activeIcon={<UnreadIcon.Follow active />}
        active={isInFollow}
        href={PATHS.FOLLOW}
        isMdUp={isMdUp}
      />

      <NavListItem
        name={
          <FormattedMessage defaultMessage="Notifications" description="" />
        }
        icon={<UnreadIcon.Notification />}
        activeIcon={<UnreadIcon.Notification active />}
        active={isInNotification}
        href={PATHS.ME_NOTIFICATIONS}
        isMdUp={isMdUp}
      />

      <Media lessThan="xl">
        <NavListItemSearch isMdUp={isMdUp} />
      </Media>

      <Dropdown
        content={
          <FocusLock>
            <section className={styles.dropdownMenu}>
              <VisuallyHidden>
                <button type="button">
                  <FormattedMessage defaultMessage="Cancel" description="" />
                </button>
              </VisuallyHidden>
              <NavMenu.Top />
              <Menu.Divider />
              <NavMenu.Bottom />
            </section>
          </FocusLock>
        }
        placement="right-start"
        appendTo={typeof window !== 'undefined' ? document.body : undefined}
        offset={[-24, 24]}
        zIndex={Z_INDEX.OVER_BOTTOM_BAR}
        onShown={hidePopperOnClick}
      >
        <NavListItem
          name={<FormattedMessage defaultMessage="My Page" description="" />}
          icon={<IconNavMe32 size="lg" />}
          activeIcon={<IconNavMeActive32 size="lg" />}
          active={isInMe}
          canScrollTop={false}
          aira-haspopup="menu"
          isMdUp={isMdUp}
        />
      </Dropdown>

      <li role="menuitem" className={styles.listItem}>
        {isMdUp ? (
          <WriteButton
            variant="sidenav"
            allowed={!viewer.shouldSetupLikerID}
            authed={viewer.isAuthed}
            forbidden={viewer.isInactive}
          />
        ) : (
          <WriteButton
            variant="navbar"
            allowed={!viewer.shouldSetupLikerID}
            authed={viewer.isAuthed}
            forbidden={viewer.isInactive}
          />
        )}
      </li>
    </ul>
  )
}

const VisitorSideNavMenu = ({ isMdUp }: { isMdUp: boolean }) => {
  return (
    <ul role="menu" className={styles.list}>
      <Media lessThan="xl">
        <NavListItemHome isMdUp={isMdUp} />

        <NavListItemSearch isMdUp={isMdUp} />
      </Media>

      <li role="menuitem" className={styles.listItem}>
        <UniversalAuthButton />
      </li>
    </ul>
  )
}

const SideNav = () => {
  const viewer = useContext(ViewerContext)

  return (
    <section className={styles.sideNav}>
      <Logo />

      {viewer.isAuthed ? (
        <>
          <Media greaterThanOrEqual="lg">
            <SideNavMenu isMdUp />
          </Media>
          <Media lessThan="lg">
            <SideNavMenu isMdUp={false} />
          </Media>
        </>
      ) : (
        <>
          <Media greaterThanOrEqual="lg">
            <VisitorSideNavMenu isMdUp />
          </Media>
          <Media lessThan="lg">
            <VisitorSideNavMenu isMdUp={false} />
          </Media>
        </>
      )}
    </section>
  )
}

export default SideNav
