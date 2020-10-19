import { useState } from 'react'

import {
  ChangePasswordForm,
  Dialog,
  useEventListener,
  useStep,
  VerificationLinkSent,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_RESET_PASSWORD_DIALOG } from '~/common/enums'

type Step = 'request' | 'verification_sent'

const ResetPasswordDialog = () => {
  // data & controls
  const { currStep, forward } = useStep<Step>('request')

  // dailog & global listeners
  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    forward('request')
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_RESET_PASSWORD_DIALOG, open)

  return (
    <Dialog isOpen={showDialog} onDismiss={close} size="sm">
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

export default ResetPasswordDialog
