import {
  Dialog,
  LoginForm,
  useDialogSwitch,
  useEventListener,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG } from '~/common/enums'

const BaseLoginDialog = () => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  useEventListener(CLOSE_ACTIVE_DIALOG, closeDialog)
  useEventListener(OPEN_LOGIN_DIALOG, openDialog)

  return (
    <Dialog size="sm" isOpen={show} onDismiss={closeDialog} fixedHeight>
      <LoginForm
        purpose="dialog"
        submitCallback={closeDialog}
        closeDialog={closeDialog}
      />
    </Dialog>
  )
}

const LoginDialog = () => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_LOGIN_DIALOG, openDialog)
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseLoginDialog />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

export default LoginDialog
