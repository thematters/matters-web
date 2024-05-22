import { useContext, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button, ViewerContext } from '~/components'

import MeAvatar from '../../MeAvatar'
import SideDrawerNav from './SideDrawerNav'

const MeButton = () => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()
  const [showNav, setShowNav] = useState(false)
  const closeNav = () => setShowNav(false)

  if (!viewer.isAuthed) {
    return null
  }

  return (
    <>
      <Button
        onClick={() => setShowNav(!showNav)}
        aria-label={intl.formatMessage({
          defaultMessage: 'My Page',
          id: 'enMIYK',
        })}
      >
        <MeAvatar user={viewer} size={32} />
      </Button>

      <SideDrawerNav isOpen={showNav} onDismiss={closeNav} />
    </>
  )
}

export default MeButton
