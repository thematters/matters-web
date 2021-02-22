import Link from 'next/link'
import { useContext } from 'react'

import {
  Dropdown,
  hidePopperOnClick,
  IconLogo,
  IconLogoGraph,
  IconNavHome24,
  IconNavHomeActive24,
  IconNavSearch24,
  Menu,
  Translate,
  useResponsive,
  useRoute,
  ViewerContext,
  WriteButton,
} from '~/components'

import { PATHS, TEXT, Z_INDEX } from '~/common/enums'

import MeAvatar from '../MeAvatar'
import NavMenu from '../NavMenu'
import UnreadIcon from '../UnreadIcon'
import NavListItem from './NavListItem'
import styles from './styles.css'

const SideNav = () => {
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
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const isInMe =
    (!isInNotification && isPathStartWith('/me')) || userName === viewerUserName

  return (
    <section className="side-nav">
      <section className="logo">
        <Link href={PATHS.HOME}>
          <a aria-label={TEXT.zh_hant.discover}>
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

        {viewer.isAuthed && (
          <Dropdown
            content={
              <section className="dropdown-menu">
                <NavMenu.Top />
                <Menu.Divider />
                <NavMenu.Bottom />
              </section>
            }
            placement="right-start"
            appendTo={process.browser ? document.body : undefined}
            offset={[-24, 24]}
            zIndex={Z_INDEX.OVER_BOTTOM_BAR}
            onShown={hidePopperOnClick}
          >
            <NavListItem
              name={<Translate zh_hant="我的" zh_hans="我的" en="Me" />}
              icon={<MeAvatar user={viewer} />}
              activeIcon={<MeAvatar user={viewer} active />}
              active={isInMe}
              isMediumUp={isMediumUp}
              canScrollTop={false}
              aira-haspopup="true"
            />
          </Dropdown>
        )}

        {viewer.isAuthed && !isInDraftDetail && (
          <li>
            <WriteButton
              allowed={!viewer.shouldSetupLikerID}
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
