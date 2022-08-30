import VisuallyHidden from '@reach/visually-hidden'
import Link from 'next/link'
import { useContext } from 'react'
import FocusLock from 'react-focus-lock'

import {
  Dropdown,
  hidePopperOnClick,
  IconLogo,
  IconLogoGraph,
  IconNavHome24,
  IconNavHomeActive24,
  IconNavSearch24,
  IconNavSettings24,
  LanguageContext,
  Menu,
  Translate,
  useResponsive,
  useRoute,
  ViewerContext,
  WriteButton,
} from '~/components'

import { PATHS, Z_INDEX } from '~/common/enums'
import { translate } from '~/common/utils'

import MeAvatar from '../MeAvatar'
import NavMenu from '../NavMenu'
import UnreadIcon from '../UnreadIcon'
import NavListItem from './NavListItem'
import styles from './styles.css'

const SideNav = () => {
  const { lang } = useContext(LanguageContext)

  const { isInPath, isPathStartWith, getQuery } = useRoute()
  const isMediumUp = useResponsive('md-up')
  const isLargeUp = useResponsive('lg-up')
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

  return (
    <section className="side-nav">
      <section className="logo">
        <Link href={PATHS.HOME}>
          <a aria-label={translate({ id: 'discover', lang })}>
            {isMediumUp ? <IconLogo /> : <IconLogoGraph />}
          </a>
        </Link>
      </section>

      <ul>
        <NavListItem
          name={<Translate id="discover" />}
          icon={<IconNavHome24 size="md" />}
          activeIcon={<IconNavHomeActive24 size="md" />}
          active={isInHome}
          isMediumUp={isMediumUp}
          href={PATHS.HOME}
        />

        <NavListItem
          name={<Translate id="follow" />}
          icon={<UnreadIcon.Follow />}
          activeIcon={<UnreadIcon.Follow active />}
          active={isInFollow}
          isMediumUp={isMediumUp}
          href={PATHS.FOLLOW}
        />

        {viewer.isAuthed && (
          <NavListItem
            name={<Translate id="notification" />}
            icon={<UnreadIcon.Notification />}
            activeIcon={<UnreadIcon.Notification active />}
            active={isInNotification}
            isMediumUp={isMediumUp}
            href={PATHS.ME_NOTIFICATIONS}
          />
        )}

        {!isLargeUp && (
          <NavListItem
            name={<Translate id="search" />}
            icon={<IconNavSearch24 size="md" />}
            activeIcon={<IconNavSearch24 size="md" color="green" />}
            active={isInSearch}
            isMediumUp={isMediumUp}
            href={PATHS.SEARCH}
          />
        )}

        {!viewer.isAuthed && (
          <NavListItem
            name={<Translate id="settings" />}
            icon={<IconNavSettings24 size="md" />}
            activeIcon={<IconNavSettings24 size="md" color="green" />}
            active={isInSettings}
            isMediumUp={isMediumUp}
            href={PATHS.SETTINGS}
          />
        )}

        {viewer.isAuthed && (
          <Dropdown
            content={
              <FocusLock>
                <section className="dropdown-menu">
                  <VisuallyHidden>
                    <button type="button">
                      <Translate id="close" />
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
              name={<Translate zh_hant="我的" zh_hans="我的" en="My Page" />}
              icon={<MeAvatar user={viewer} />}
              activeIcon={<MeAvatar user={viewer} active />}
              active={isInMe}
              isMediumUp={isMediumUp}
              canScrollTop={false}
              aira-haspopup="true"
            />
          </Dropdown>
        )}

        {!isInDraftDetail && (
          <li>
            <WriteButton
              allowed={!viewer.shouldSetupLikerID}
              authed={viewer.isAuthed}
              isLarge={isMediumUp}
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
