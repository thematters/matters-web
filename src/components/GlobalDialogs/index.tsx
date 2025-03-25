import { useContext, useEffect } from 'react'

import { OPEN_SET_USER_NAME_DIALOG } from '~/common/enums'
import { SetUserNameDialog, useRoute, ViewerContext } from '~/components'

import UniversalAuthDialog from './UniversalAuthDialog'

const GlobalDialogs = () => {
  const viewer = useContext(ViewerContext)
  const { router, isInPath } = useRoute()

  useEffect(() => {
    if (!viewer.isAuthed) {
      return
    }

    if (
      (!viewer.userName || viewer.info.userNameEditable) &&
      !isInPath('CALLBACK_PROVIDER')
    ) {
      window.dispatchEvent(new CustomEvent(OPEN_SET_USER_NAME_DIALOG))
    }
  }, [
    router.pathname,
    viewer.isAuthed,
    viewer.userName,
    viewer.info.userNameEditable,
  ])

  return (
    <>
      <UniversalAuthDialog />
      <SetUserNameDialog />
    </>
  )
}

export default GlobalDialogs
