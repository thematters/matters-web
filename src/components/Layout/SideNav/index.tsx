import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  Icon,
  Translate,
  useResponsive,
  ViewerContext,
  WriteButton
} from '~/components'

import { PATHS, TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import MeAvatar from './MeAvatar'
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
  const isInMe = router.pathname.indexOf(viewerUserName) >= 0
  const isInDraftDetail = router.pathname.indexOf('/me/drafts') >= 0

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

        <NavListItem
          name={<Translate zh_hant="我的" zh_hans="我的" />}
          icon={<MeAvatar user={viewer} />}
          activeIcon={<MeAvatar user={viewer} active />}
          active={isInMe}
          isMediumUp={isMediumUp}
          {...toPath({
            page: 'userProfile',
            userName: viewerUserName
          })}
        />

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
