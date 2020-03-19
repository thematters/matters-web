import { useRouter } from 'next/router'
import { useContext } from 'react'

import { Icon, ViewerContext, WriteButton } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

import UnreadIcon from '../UnreadIcon'
import NavListItem from './NavListItem'
import styles from './styles.css'

const NavBar = () => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)

  const isInHome = router.pathname === PATHS.HOME.href
  const isInFollow = router.pathname === PATHS.FOLLOW.href
  const isInNotification = router.pathname === PATHS.ME_NOTIFICATIONS.href
  const isInSearch = router.pathname === PATHS.SEARCH.href
  const isInDraftDetail = router.pathname.indexOf('/me/drafts') >= 0

  return (
    <section className="nav-bar" role="navigation">
      <ul>
        <NavListItem
          name={TEXT.zh_hant.discover}
          icon={<Icon.HomeLarge size="lg" />}
          activeIcon={<Icon.HomeActiveLarge size="lg" color="green" />}
          active={isInHome}
          {...PATHS.HOME}
        />

        <NavListItem
          name={TEXT.zh_hant.follow}
          icon={<UnreadIcon.Follow />}
          activeIcon={<UnreadIcon.Follow active />}
          active={isInFollow}
          {...PATHS.FOLLOW}
        />

        {!isInDraftDetail && (
          <li>
            <WriteButton allowed={!viewer.shouldSetupLikerID} />
          </li>
        )}

        <NavListItem
          name={TEXT.zh_hant.search}
          icon={<Icon.SearchLarge size="lg" />}
          activeIcon={<Icon.SearchLarge size="lg" color="green" />}
          active={isInSearch}
          {...PATHS.SEARCH}
        />

        <NavListItem
          name={TEXT.zh_hant.notification}
          icon={<UnreadIcon.Notification />}
          activeIcon={<UnreadIcon.Notification active />}
          active={isInNotification}
          {...PATHS.ME_NOTIFICATIONS}
        />
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default NavBar
