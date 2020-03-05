import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  Button,
  Icon,
  TextIcon,
  Translate,
  useResponsive,
  ViewerContext,
  WriteButton
} from '~/components'

import { PATHS, TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

interface NavListItemProps {
  name: React.ReactNode
  href: string
  as: string
  icon: React.ReactNode
  activeIcon: React.ReactNode
  active: boolean
  isMediumUp: boolean
}

const NavListItem = ({
  name,
  href,
  as,
  icon,
  activeIcon,
  active,
  isMediumUp
}: NavListItemProps) => (
  <li>
    <Button
      href={href}
      as={as}
      bgHoverColor="green-lighter"
      spacing={isMediumUp ? ['xxtight', 'xtight'] : undefined}
      size={isMediumUp ? undefined : ['2rem', '2rem']}
    >
      <TextIcon
        icon={active ? activeIcon : icon}
        size="lg"
        weight="semibold"
        spacing="xtight"
        color={active ? 'green' : 'black'}
      >
        {isMediumUp && name}
      </TextIcon>
    </Button>

    <style jsx>{styles}</style>
  </li>
)

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
          icon={<Icon.HomeLarge size="lg" />}
          activeIcon={<Icon.HomeActiveLarge size="lg" />}
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
