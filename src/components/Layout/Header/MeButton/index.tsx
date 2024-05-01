import { useContext, useState } from 'react'

import { TEXT } from '~/common/enums'
import { Button, LanguageContext, ViewerContext } from '~/components'

import MeAvatar from '../../MeAvatar'
import SideDrawerNav from './SideDrawerNav'

const MeButton = () => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const [showNav, setShowNav] = useState(false)
  const closeNav = () => setShowNav(false)

  if (!viewer.isAuthed) {
    return null
  }

  return (
    <>
      <Button
        onClick={() => setShowNav(!showNav)}
        aria-label={TEXT[lang].myPage}
      >
        <MeAvatar user={viewer} size={32} />
      </Button>

      <SideDrawerNav isOpen={showNav} onDismiss={closeNav} />
    </>
  )
}

export default MeButton
