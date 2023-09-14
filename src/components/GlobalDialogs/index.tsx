import { useContext, useEffect } from 'react'

import { OPEN_SET_USER_NAME_DIALOG } from '~/common/enums'
import { LikeCoinDialog, SetUserNameDialog, ViewerContext } from '~/components'

import UniversalAuthDialog from './UniversalAuthDialog'

const GlobalDialogs = () => {
  const viewer = useContext(ViewerContext)

  useEffect(() => {
    if (!viewer.isAuthed) {
      return
    }

    if (!viewer.userName || viewer.info.userNameEditable) {
      window.dispatchEvent(new CustomEvent(OPEN_SET_USER_NAME_DIALOG))
    }
  }, [])

  return (
    <>
      <UniversalAuthDialog />
      <LikeCoinDialog />
      <SetUserNameDialog />
    </>
  )
}

export default GlobalDialogs
