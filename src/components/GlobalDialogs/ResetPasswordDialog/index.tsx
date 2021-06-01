import {
  ChangePasswordForm,
  Dialog,
  useDialogSwitch,
  useEventListener,
  useStep,
  VerificationLinkSent,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_RESET_PASSWORD_DIALOG } from '~/common/enums'

type Step = 'request' | 'verification_sent'

const BaseResetPasswordDialog = () => {
  // data & controls
  const { currStep, forward } = useStep<Step>('request')

  // dailog & global listeners
  const { show, openDialog: baseOpenDialog, closeDialog } = useDialogSwitch(
    true
  )
  const openDialog = () => {
    forward('request')
    baseOpenDialog()
  }

  useEventListener(CLOSE_ACTIVE_DIALOG, closeDialog)
  useEventListener(OPEN_RESET_PASSWORD_DIALOG, openDialog)

  return (
    <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
      {currStep === 'request' && (
        <ChangePasswordForm.Request
          type="forget"
          purpose="dialog"
          submitCallback={() => forward('verification_sent')}
          closeDialog={closeDialog}
        />
      )}

      {currStep === 'verification_sent' && (
        <VerificationLinkSent
          type="resetPassword"
          purpose="dialog"
          closeDialog={closeDialog}
        />
      )}
    </Dialog>
  )
}

const ResetPasswordDialog = () => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_RESET_PASSWORD_DIALOG, openDialog)
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseResetPasswordDialog />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

export default ResetPasswordDialog
