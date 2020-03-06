import { useContext, useState } from 'react'

import { Button, ViewerContext } from '~/components'

import MeAvatar from '../../MeAvatar'
import SideDrawerNav from './SideDrawerNav'

const MeButton = () => {
  const viewer = useContext(ViewerContext)
  const [showNav, setShowNav] = useState(false)
  const close = () => setShowNav(false)

  return (
    <>
      <Button onClick={() => setShowNav(!showNav)}>
        <MeAvatar user={viewer} size="lg" />
      </Button>

      <SideDrawerNav isOpen={showNav} onDismiss={close} />
    </>
  )
}

export default MeButton
