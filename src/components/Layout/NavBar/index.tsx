import { useContext } from 'react'

import { PATHS, TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  IconNavHome32,
  IconNavHomeActive32,
  IconNavSearch32,
  IconNavSearchActive32,
  LanguageContext,
  UniversalAuthButton,
  useRoute,
  ViewerContext,
  WriteButton,
} from '~/components'

import UnreadIcon from '../UnreadIcon'
import NavListItem from './NavListItem'
import styles from './styles.module.css'

const NavBar = () => {
  const viewer = useContext(ViewerContext)
  const { router, isInPath } = useRoute()
  const { lang } = useContext(LanguageContext)
  const isInHome = isInPath('HOME')
  const isInFollow = isInPath('FOLLOW')
  const isInNotification = isInPath('ME_NOTIFICATIONS')
  const isInSearch = isInPath('SEARCH')
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')

  if (!viewer.isAuthed) {
    return (
      <section className={styles.navBar} role="navigation">
        <ul className={styles.list}>
          <NavListItem
            name={TEXT[lang].discover}
            icon={<IconNavHome32 size="lg" />}
            activeIcon={<IconNavHomeActive32 size="lg" />}
            active={isInHome}
            href={PATHS.HOME}
          />

          <li role="menuitem" className={styles.listItem}>
            <UniversalAuthButton />
          </li>

          <NavListItem
            name={TEXT[lang].search}
            icon={<IconNavSearch32 size="lg" />}
            activeIcon={<IconNavSearchActive32 size="lg" />}
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
          name={TEXT[lang].discover}
          icon={<IconNavHome32 size="lg" />}
          activeIcon={<IconNavHomeActive32 size="lg" />}
          active={isInHome}
          href={PATHS.HOME}
        />

        <NavListItem
          name={TEXT[lang].follow}
          icon={<UnreadIcon.Follow />}
          activeIcon={<UnreadIcon.Follow active />}
          active={isInFollow}
          href={PATHS.FOLLOW}
        />

        {!isInDraftDetail && (
          <li className={styles.listItem}>
            <WriteButton
              allowed
              authed={viewer.isAuthed}
              forbidden={viewer.isInactive}
            />
          </li>
        )}

        <NavListItem
          name={TEXT[lang].search}
          icon={<IconNavSearch32 size="lg" />}
          activeIcon={<IconNavSearchActive32 size="lg" />}
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
          name={TEXT[lang].notifications}
          icon={<UnreadIcon.Notification />}
          activeIcon={<UnreadIcon.Notification active />}
          active={isInNotification}
          href={PATHS.ME_NOTIFICATIONS}
          aria-label={TEXT[lang].notifications}
        />
      </ul>
    </section>
  )
}

export default NavBar
