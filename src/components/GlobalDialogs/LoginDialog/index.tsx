import {
  Dialog,
  LoginForm,
  useDialogSwitch,
  useEventListener,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG } from '~/common/enums'

const BaseLoginDialog = () => {
  const { show, open, close } = useDialogSwitch(true)

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_LOGIN_DIALOG, open)

  return (
    <Dialog size="sm" isOpen={show} onDismiss={close} fixedHeight>
      <LoginForm purpose="dialog" submitCallback={close} closeDialog={close} />
    </Dialog>
  )
}

const LoginDialog = () => {
  const Children = ({ open }: { open: () => void }) => {
    useEventListener(OPEN_LOGIN_DIALOG, open)
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseLoginDialog />}>
      {({ open }) => <Children open={open} />}
    </Dialog.Lazy>
  )
}

export default LoginDialog
