import VisuallyHidden from '@reach/visually-hidden'
import Link from 'next/link'
import { useContext } from 'react'
import FocusLock from 'react-focus-lock'
import { FormattedMessage, useIntl } from 'react-intl'

import { PATHS, Z_INDEX } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Dropdown,
  hidePopperOnClick,
  IconLogo,
  IconLogoGraph,
  IconNavHome32,
  IconNavHomeActive32,
  IconNavMe32,
  IconNavMeActive32,
  IconNavSearch32,
  IconNavSearchActive32,
  Media,
  Menu,
  UniversalAuthButton,
  useRoute,
  ViewerContext,
  WriteButton,
} from '~/components'

import NavMenu from '../NavMenu'
import UnreadIcon from '../UnreadIcon'
import NavListItem from './NavListItem'
import styles from './styles.css'

const Logo = () => {
  const intl = useIntl()

  return (
    <section className="logo">
      <Link href={PATHS.HOME} legacyBehavior>
        <a
          aria-label={intl.formatMessage({
            defaultMessage: 'Discover',
            description: '',
          })}
        >
          <Media at="md">
            <IconLogoGraph />
          </Media>
          <Media greaterThan="md">
            <IconLogo />
          </Media>
        </a>
      </Link>
    </section>
  )
}

const SideNav = () => {
  const { router, isInPath, isPathStartWith, getQuery } = useRoute()
  const viewer = useContext(ViewerContext)

  const userName = getQuery('name')
  const viewerUserName = viewer.userName || ''

  const isInHome = isInPath('HOME')
  const isInFollow = isInPath('FOLLOW')
  const isInNotification = isInPath('ME_NOTIFICATIONS')
  const isInSearch = isInPath('SEARCH')
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const isInMe =
    (!isInNotification && isPathStartWith('/me')) || userName === viewerUserName

  // only show auth button for anonymous
  if (!viewer.isAuthed) {
    return (
      <section className="side-nav">
        <Logo />

        <ul role="menu">
          <li role="menuitem">
            <UniversalAuthButton />
          </li>
        </ul>

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className="side-nav">
      <Logo />

      <ul role="menu">
        <NavListItem
          name={<FormattedMessage defaultMessage="Discover" description="" />}
          icon={<IconNavHome32 size="lg" />}
          activeIcon={<IconNavHomeActive32 size="lg" />}
          active={isInHome}
          href={PATHS.HOME}
        />

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
        />

        <NavListItem
          name={
            <FormattedMessage defaultMessage="Notifications" description="" />
          }
          icon={<UnreadIcon.Notification />}
          activeIcon={<UnreadIcon.Notification active />}
          active={isInNotification}
          href={PATHS.ME_NOTIFICATIONS}
        />

        <Media lessThan="xl">
          <NavListItem
            name={<FormattedMessage defaultMessage="Search" description="" />}
            icon={<IconNavSearch32 size="lg" />}
            activeIcon={<IconNavSearchActive32 size="lg" />}
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

        <Dropdown
          content={
            <FocusLock>
              <section className="dropdown-menu">
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
          />
        </Dropdown>

        {!isInDraftDetail && (
          <li role="menuitem">
            <Media greaterThanOrEqual="lg">
              <WriteButton
                variant="sidenav"
                allowed={!viewer.shouldSetupLikerID}
                authed={viewer.isAuthed}
                forbidden={viewer.isInactive}
              />
            </Media>
            <Media lessThan="lg">
              <WriteButton
                variant="navbar"
                allowed={!viewer.shouldSetupLikerID}
                authed={viewer.isAuthed}
                forbidden={viewer.isInactive}
              />
            </Media>
          </li>
        )}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SideNav
