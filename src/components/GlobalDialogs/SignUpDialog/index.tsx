import { useState } from 'react'

import { Dialog, SignUpForm, useEventListener, useStep } from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_SIGNUP_DIALOG } from '~/common/enums'

type Step = 'init' | 'verification_sent'

const SignUpDialog = () => {
  const { currStep, forward } = useStep<Step>('init')

  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    forward('init')
    setShowDialog(true)
  }
  const close = () => {
    setShowDialog(false)
  }

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_SIGNUP_DIALOG, open)

  return (
    <Dialog
      size="sm"
      isOpen={showDialog}
      onDismiss={close}
      fixedHeight={currStep !== 'verification_sent'}
    >
      {currStep === 'init' && (
        <SignUpForm.Init
          purpose="dialog"
          submitCallback={() => {
            forward('verification_sent')
          }}
          closeDialog={close}
        />
      )}
      {currStep === 'verification_sent' && (
        <SignUpForm.VerificationLinkSent purpose="dialog" closeDialog={close} />
      )}
    </Dialog>
  )
}

export default SignUpDialog
