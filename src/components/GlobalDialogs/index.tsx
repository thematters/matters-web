import { useContext, useEffect } from 'react'

import { OPEN_SET_USER_NAME_DIALOG } from '~/common/enums'
import { SetUserNameDialog, ViewerContext } from '~/components'

import UniversalAuthDialog from './UniversalAuthDialog'

const GlobalDialogs = () => {
  const viewer = useContext(ViewerContext)

  useEffect(() => {
    if (viewer.isAuthed && viewer.userName === null) {
      window.dispatchEvent(new CustomEvent(OPEN_SET_USER_NAME_DIALOG))
    }
  }, [])

  return (
    <>
      <UniversalAuthDialog />
      <SetUserNameDialog />
    </>
  )
}

export default GlobalDialogs
