import { useContext, useState } from 'react'

import { Button, ViewerContext } from '~/components'

import MeAvatar from '../../MeAvatar'

const MeButton = () => {
  const [showNav, setShowNav] = useState(false)
  const viewer = useContext(ViewerContext)

  return (
    <Button onClick={() => setShowNav(!showNav)}>
      <MeAvatar user={viewer} />
    </Button>
  )
}

export default MeButton
