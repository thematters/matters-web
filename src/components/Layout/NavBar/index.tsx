import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconNavHome from '@/public/static/icons/24px/nav-home.svg'
import IconNavHomeActive from '@/public/static/icons/24px/nav-home-active.svg'
import IconNavSearch from '@/public/static/icons/24px/nav-search.svg'
import IconNavSearchActive from '@/public/static/icons/24px/nav-search-active.svg'
import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Icon,
  UniversalAuthButton,
  useRoute,
  ViewerContext,
} from '~/components'

import UnreadIcon from '../UnreadIcon'
import { NavCreate } from './NavCreate'
import NavListItem from './NavListItem'
import styles from './styles.module.css'

const NavBar = () => {
  const viewer = useContext(ViewerContext)
  const { router, isInPath } = useRoute()
  const intl = useIntl()
  const isInHome = isInPath('HOME')
  const isInFollow = isInPath('FOLLOW')
  const isInNotification = isInPath('ME_NOTIFICATIONS')
  const isInSearch = isInPath('SEARCH')

  if (!viewer.isAuthed) {
    return (
      <section className={styles.navBar} role="navigation">
        <ul className={styles.list}>
          <NavListItem
            name={<FormattedMessage defaultMessage="Discover" id="cE4Hfw" />}
            icon={<Icon icon={IconNavHome} size={32} />}
            activeIcon={<Icon icon={IconNavHomeActive} size={32} />}
            active={isInHome}
            href={PATHS.HOME}
          />

          <li role="menuitem" className={styles.listItem}>
            <UniversalAuthButton resideIn="nav" />
          </li>

          <NavListItem
            name={<FormattedMessage defaultMessage="Search" id="xmcVZ0" />}
            icon={<Icon icon={IconNavSearch} size={32} />}
            activeIcon={<Icon icon={IconNavSearchActive} size={32} />}
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
        </ul>
      </section>
    )
  }

  return (
    <section className={styles.navBar} role="navigation">
      <ul className={styles.list}>
        <NavListItem
          name={<FormattedMessage defaultMessage="Discover" id="cE4Hfw" />}
          icon={<Icon icon={IconNavHome} size={32} />}
          activeIcon={<Icon icon={IconNavHomeActive} size={32} />}
          active={isInHome}
          href={PATHS.HOME}
        />

        <NavListItem
          name={<FormattedMessage defaultMessage="Follow" id="ieGrWo" />}
          icon={<UnreadIcon.Follow />}
          activeIcon={<UnreadIcon.Follow active />}
          active={isInFollow}
          href={PATHS.FOLLOW}
        />
        <NavCreate />

        <NavListItem
          name={<FormattedMessage defaultMessage="Search" id="xmcVZ0" />}
          icon={<Icon icon={IconNavSearch} size={32} />}
          activeIcon={<Icon icon={IconNavSearchActive} size={32} />}
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

        <NavListItem
          name={<FormattedMessage defaultMessage="Notifications" id="NAidKb" />}
          icon={<UnreadIcon.Notification />}
          activeIcon={<UnreadIcon.Notification active />}
          active={isInNotification}
          href={PATHS.ME_NOTIFICATIONS}
          aria-label={intl.formatMessage({
            defaultMessage: 'Notifications',
            id: 'NAidKb',
          })}
        />
      </ul>
    </section>
  )
}

export default NavBar
