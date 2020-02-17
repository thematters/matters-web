import { useState } from 'react'

import { Dialog, LoginForm, Translate, useEventListener } from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG, TEXT } from '~/common/enums'

const LoginDialog = () => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_LOGIN_DIALOG, open)

  return (
    <Dialog
      title={
        <Translate zh_hant={TEXT.zh_hant.login} zh_hans={TEXT.zh_hans.login} />
      }
      isOpen={showDialog}
      onDismiss={close}
    >
      <LoginForm purpose="dialog" submitCallback={close} />
    </Dialog>
  )
}

export default LoginDialog
