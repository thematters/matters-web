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
  IconNavHome24,
  IconNavHomeActive24,
  IconNavSearch24,
  IconNavSettings24,
  Media,
  Menu,
  useRoute,
  ViewerContext,
  WriteButton,
} from '~/components'

import MeAvatar from '../MeAvatar'
import NavMenu from '../NavMenu'
import UnreadIcon from '../UnreadIcon'
import NavListItem from './NavListItem'
import styles from './styles.css'

const SideNav = () => {
  const { router, isInPath, isPathStartWith, getQuery } = useRoute()
  const viewer = useContext(ViewerContext)

  const userName = getQuery('name')
  const viewerUserName = viewer.userName || ''

  const isInHome = isInPath('HOME')
  const isInFollow = isInPath('FOLLOW')
  const isInNotification = isInPath('ME_NOTIFICATIONS')
  const isInSearch = isInPath('SEARCH')
  const isInSettings = isInPath('SETTINGS')
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const isInMe =
    (!isInNotification && isPathStartWith('/me')) || userName === viewerUserName

  const intl = useIntl()
  return (
    <section className="side-nav">
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

      <ul role="menu">
        <NavListItem
          name={<FormattedMessage defaultMessage="Discover" description="" />}
          icon={<IconNavHome24 size="md" />}
          activeIcon={<IconNavHomeActive24 size="md" />}
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

        {viewer.isAuthed && (
          <NavListItem
            name={
              <FormattedMessage defaultMessage="Notifications" description="" />
            }
            icon={<UnreadIcon.Notification />}
            activeIcon={<UnreadIcon.Notification active />}
            active={isInNotification}
            href={PATHS.ME_NOTIFICATIONS}
          />
        )}

        <Media lessThan="xl">
          <NavListItem
            name={<FormattedMessage defaultMessage="Search" description="" />}
            icon={<IconNavSearch24 size="md" />}
            activeIcon={<IconNavSearch24 size="md" color="green" />}
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

        {!viewer.isAuthed && (
          <NavListItem
            name={<FormattedMessage defaultMessage="Settings" description="" />}
            icon={<IconNavSettings24 size="md" />}
            activeIcon={<IconNavSettings24 size="md" color="green" />}
            active={isInSettings}
            href={PATHS.ME_SETTINGS}
          />
        )}

        {viewer.isAuthed && (
          <Dropdown
            content={
              <FocusLock>
                <section className="dropdown-menu">
                  <VisuallyHidden>
                    <button type="button">
                      <FormattedMessage
                        defaultMessage="Cancel"
                        description=""
                      />
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
              name={
                <FormattedMessage defaultMessage="My Page" description="" />
              }
              icon={<MeAvatar user={viewer} />}
              activeIcon={<MeAvatar user={viewer} active />}
              active={isInMe}
              canScrollTop={false}
              aira-haspopup="menu"
            />
          </Dropdown>
        )}

        {!isInDraftDetail && (
          <li role="menuitem">
            <WriteButton
              allowed={!viewer.shouldSetupLikerID}
              authed={viewer.isAuthed}
              forbidden={viewer.isInactive}
            />
          </li>
        )}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SideNav
