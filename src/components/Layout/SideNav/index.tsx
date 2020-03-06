import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  Dropdown,
  hidePopperOnClick,
  Icon,
  Menu,
  Translate,
  useResponsive,
  ViewerContext,
  WriteButton
} from '~/components'

import { PATHS, TEXT, Z_INDEX } from '~/common/enums'

import MeAvatar from '../MeAvatar'
import NavMenu from '../NavMenu'
import NavListItem from './NavListItem'
import styles from './styles.css'

const SideNav = () => {
  const isMediumUp = useResponsive('md-up')
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const viewerUserName = viewer.userName || ''

  const isInHome = router.pathname === PATHS.HOME.href
  const isInFollow = router.pathname === PATHS.FOLLOW.href
  const isInNotification = router.pathname === PATHS.ME_NOTIFICATIONS.href
  const isInMe =
    router.asPath.indexOf(viewerUserName) >= 0 ||
    [
      PATHS.ME_APPRECIATIONS_RECEIVED.href,
      PATHS.ME_APPRECIATIONS_SENT.href,
      PATHS.ME_SETTINGS_ACCOUNT.href,
      PATHS.ME_SETTINGS_BLOCKED.href,
      PATHS.ME_SETTINGS_NOTIFICATION.href
    ].indexOf(router.pathname) >= 0
  const isInDraftDetail = router.asPath.indexOf('/me/drafts') >= 0

  return (
    <section className="side-nav">
      <section className="logo">
        <Link {...PATHS.HOME}>
          <a aria-label={TEXT.zh_hant.discover}>
            {isMediumUp ? <Icon.Logo /> : <Icon.LogoGraph />}
          </a>
        </Link>
      </section>

      <ul>
        <NavListItem
          name={<Translate id="discover" />}
          icon={<Icon.HomeLarge size="lg" />}
          activeIcon={<Icon.HomeActiveLarge size="lg" />}
          active={isInHome}
          isMediumUp={isMediumUp}
          {...PATHS.HOME}
        />

        <NavListItem
          name={<Translate id="follow" />}
          icon={<Icon.FollowLarge size="lg" />}
          activeIcon={<Icon.FollowActiveLarge size="lg" />}
          active={isInFollow}
          isMediumUp={isMediumUp}
          {...PATHS.FOLLOW}
        />

        <NavListItem
          name={<Translate id="notification" />}
          icon={<Icon.NotificationLarge size="lg" />}
          activeIcon={<Icon.NotificationActiveLarge size="lg" />}
          active={isInNotification}
          isMediumUp={isMediumUp}
          {...PATHS.ME_NOTIFICATIONS}
        />

        <Dropdown
          content={
            <section className="dropdown-menu">
              <NavMenu.Top />
              <Menu.Divider />
              <NavMenu.Bottom />
            </section>
          }
          placement="right"
          distance={16}
          appendTo={process.browser ? document.body : undefined}
          zIndex={Z_INDEX.OVER_GLOBAL_HEADER}
          onShown={i => {
            hidePopperOnClick(i)
          }}
        >
          <NavListItem
            name={<Translate zh_hant="我的" zh_hans="我的" />}
            icon={<MeAvatar user={viewer} />}
            activeIcon={<MeAvatar user={viewer} active />}
            active={isInMe}
            isMediumUp={isMediumUp}
            aira-haspopup="true"
          />
        </Dropdown>

        {!isInDraftDetail && (
          <li>
            <WriteButton
              allowed={!viewer.shouldSetupLikerID}
              isLarge={isMediumUp}
            />
          </li>
        )}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SideNav
