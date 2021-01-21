import {
  Dialog,
  LoginForm,
  useDialogSwitch,
  useEventListener,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG } from '~/common/enums'

const LoginDialog = () => {
  const { show, open, close } = useDialogSwitch(false)

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_LOGIN_DIALOG, open)

  return (
    <Dialog size="sm" isOpen={show} onDismiss={close} fixedHeight>
      <LoginForm purpose="dialog" submitCallback={close} closeDialog={close} />
    </Dialog>
  )
}

export default LoginDialog
