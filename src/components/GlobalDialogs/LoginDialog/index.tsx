import { useState } from 'react'

import { Dialog, LoginForm, useEventListener } from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG } from '~/common/enums'

const LoginDialog = () => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_LOGIN_DIALOG, open)

  return (
    <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
      <LoginForm purpose="dialog" submitCallback={close} closeDialog={close} />
    </Dialog>
  )
}

export default LoginDialog
