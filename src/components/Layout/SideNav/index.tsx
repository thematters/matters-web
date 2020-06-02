import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  Dropdown,
  hidePopperOnClick,
  IconLogo,
  IconLogoGraph,
  IconNavHome,
  IconNavHomeActive,
  IconNavSearch,
  Menu,
  Translate,
  useResponsive,
  ViewerContext,
  WriteButton,
} from '~/components'

import { PATHS, TEXT, Z_INDEX } from '~/common/enums'
import { getQuery } from '~/common/utils'

import MeAvatar from '../MeAvatar'
import NavMenu from '../NavMenu'
import UnreadIcon from '../UnreadIcon'
import NavListItem from './NavListItem'
import styles from './styles.css'

const SideNav = () => {
  const isMediumUp = useResponsive('md-up')
  const isLargeUp = useResponsive('lg-up')
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const userName = getQuery({ router, key: 'userName' })
  const viewerUserName = viewer.userName || ''

  const isInHome = router.pathname === PATHS.HOME
  const isInFollow = router.pathname === PATHS.FOLLOW
  const isInNotification = router.pathname === PATHS.ME_NOTIFICATIONS
  const isInSearch = router.pathname === PATHS.SEARCH
  const isInMe =
    router.pathname !== PATHS.ME_NOTIFICATIONS &&
    (router.pathname.indexOf('/me') >= 0 || userName === viewerUserName)
  const isInDraftDetail = router.pathname === PATHS.ME_DRAFT_DETAIL

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
          icon={<IconNavHome size="md" />}
          activeIcon={<IconNavHomeActive size="md" />}
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
            icon={<IconNavSearch size="md" />}
            activeIcon={<IconNavSearch size="md" color="green" />}
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
            zIndex={Z_INDEX.OVER_GLOBAL_HEADER}
            onShown={hidePopperOnClick}
          >
            <NavListItem
              name={<Translate zh_hant="我的" zh_hans="我的" />}
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
