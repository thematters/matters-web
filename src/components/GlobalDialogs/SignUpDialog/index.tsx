import { useState } from 'react'

import {
  Dialog,
  SetupLikeCoin,
  SignUpForm,
  useEventListener,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_SIGNUP_DIALOG } from '~/common/enums'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

const SignUpDialog = () => {
  const [step, setStep] = useState<Step>('signUp')

  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    setStep('signUp')
    setShowDialog(true)
  }
  const close = () => {
    setShowDialog(false)
  }

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_SIGNUP_DIALOG, open)

  return (
    <Dialog
      isOpen={showDialog}
      onDismiss={close}
      fixedHeight={step !== 'complete'}
    >
      {step === 'signUp' && (
        <SignUpForm.Init
          purpose="dialog"
          submitCallback={() => {
            setStep('profile')
          }}
          closeDialog={close}
        />
      )}
      {step === 'profile' && (
        <SignUpForm.Profile
          purpose="dialog"
          submitCallback={() => {
            setStep('setupLikeCoin')
          }}
          closeDialog={close}
        />
      )}
      {step === 'setupLikeCoin' && (
        <SetupLikeCoin
          purpose="dialog"
          submitCallback={() => {
            setStep('complete')
          }}
          closeDialog={close}
        />
      )}
      {step === 'complete' && <SignUpForm.Complete closeDialog={close} />}
    </Dialog>
  )
}

export default SignUpDialog
