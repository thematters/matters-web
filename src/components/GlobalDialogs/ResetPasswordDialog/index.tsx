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
  const { show, open: baseOpen, close } = useDialogSwitch(true)
  const open = () => {
    forward('request')
    baseOpen()
  }

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_RESET_PASSWORD_DIALOG, open)

  return (
    <Dialog isOpen={show} onDismiss={close} size="sm">
      {currStep === 'request' && (
        <ChangePasswordForm.Request
          type="forget"
          purpose="dialog"
          submitCallback={() => forward('verification_sent')}
          closeDialog={close}
        />
      )}

      {currStep === 'verification_sent' && (
        <VerificationLinkSent
          type="resetPassword"
          purpose="dialog"
          closeDialog={close}
        />
      )}
    </Dialog>
  )
}

const ResetPasswordDialog = () => {
  const Children = ({ open }: { open: () => void }) => {
    useEventListener(OPEN_RESET_PASSWORD_DIALOG, open)
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseResetPasswordDialog />}>
      {({ open }) => <Children open={open} />}
    </Dialog.Lazy>
  )
}

export default ResetPasswordDialog
