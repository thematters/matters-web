import { useContext } from 'react'

import { PATHS, TEXT } from '~/common/enums'
import {
  IconNavHome24,
  IconNavHomeActive24,
  IconNavSearch24,
  IconNavSettings24,
  LanguageContext,
  useRoute,
  ViewerContext,
  WriteButton,
} from '~/components'

import UnreadIcon from '../UnreadIcon'
import NavListItem from './NavListItem'
import styles from './styles.css'

const NavBar = () => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { isInPath } = useRoute()
  const isInHome = isInPath('HOME')
  const isInFollow = isInPath('FOLLOW')
  const isInNotification = isInPath('ME_NOTIFICATIONS')
  const isInSettings = isInPath('SETTINGS')
  const isInSearch = isInPath('SEARCH')
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')

  return (
    <section className="nav-bar" role="navigation">
      <ul>
        <NavListItem
          name={TEXT[lang].discover}
          icon={<IconNavHome24 size="md" />}
          activeIcon={<IconNavHomeActive24 size="md" color="green" />}
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
          <li>
            <WriteButton
              allowed={!viewer.shouldSetupLikerID}
              authed={viewer.isAuthed}
              forbidden={viewer.isInactive}
            />
          </li>
        )}

        <NavListItem
          name={TEXT[lang].search}
          icon={<IconNavSearch24 size="md" />}
          activeIcon={<IconNavSearch24 size="md" color="green" />}
          active={isInSearch}
          href={PATHS.SEARCH}
        />

        {viewer.isAuthed && (
          <NavListItem
            name={TEXT[lang].notifications}
            icon={<UnreadIcon.Notification />}
            activeIcon={<UnreadIcon.Notification active />}
            active={isInNotification}
            href={PATHS.ME_NOTIFICATIONS}
            aria-label={TEXT[lang].notifications}
          />
        )}

        {!viewer.isAuthed && (
          <NavListItem
            name={TEXT[lang].settings}
            icon={<IconNavSettings24 size="md" />}
            activeIcon={<IconNavSettings24 size="md" color="green" />}
            active={isInSettings}
            href={PATHS.ME_SETTINGS}
          />
        )}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default NavBar
