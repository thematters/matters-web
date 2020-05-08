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

  const isInHome = router.pathname === PATHS.HOME
  const isInFollow = router.pathname === PATHS.FOLLOW
  const isInNotification = router.pathname === PATHS.ME_NOTIFICATIONS
  const isInSearch = router.pathname === PATHS.SEARCH
  const isInDraftDetail = router.pathname.indexOf('/me/drafts') >= 0

  return (
    <section className="nav-bar" role="navigation">
      <ul>
        <NavListItem
          name={TEXT.zh_hant.discover}
          icon={<Icon.NavHome size="md" />}
          activeIcon={<Icon.NavHomeActive size="md" color="green" />}
          active={isInHome}
          href={PATHS.HOME}
        />

        <NavListItem
          name={TEXT.zh_hant.follow}
          icon={<UnreadIcon.Follow />}
          activeIcon={<UnreadIcon.Follow active />}
          active={isInFollow}
          href={PATHS.FOLLOW}
        />

        {!isInDraftDetail && (
          <li>
            <WriteButton
              allowed={!viewer.shouldSetupLikerID}
              forbidden={viewer.isInactive}
            />
          </li>
        )}

        <NavListItem
          name={TEXT.zh_hant.search}
          icon={<Icon.NavSearch size="md" />}
          activeIcon={<Icon.NavSearch size="md" color="green" />}
          active={isInSearch}
          href={PATHS.SEARCH}
        />

        <NavListItem
          name={TEXT.zh_hant.notification}
          icon={<UnreadIcon.Notification />}
          activeIcon={<UnreadIcon.Notification active />}
          active={isInNotification}
          href={PATHS.ME_NOTIFICATIONS}
        />
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default NavBar
