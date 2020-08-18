import { useState } from 'react'

import {
  Dialog,
  SetupLikeCoin,
  SignUpForm,
  useEventListener,
  useStep,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_SIGNUP_DIALOG } from '~/common/enums'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

const SignUpDialog = () => {
  const { currStep, goForward } = useStep<Step>('signUp')

  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    goForward('signUp')
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
      fixedHeight={currStep !== 'complete'}
    >
      {currStep === 'signUp' && (
        <SignUpForm.Init
          purpose="dialog"
          submitCallback={() => {
            goForward('profile')
          }}
          closeDialog={close}
        />
      )}
      {currStep === 'profile' && (
        <SignUpForm.Profile
          purpose="dialog"
          submitCallback={() => {
            goForward('setupLikeCoin')
          }}
          closeDialog={close}
        />
      )}
      {currStep === 'setupLikeCoin' && (
        <SetupLikeCoin
          purpose="dialog"
          submitCallback={() => {
            goForward('complete')
          }}
          closeDialog={close}
        />
      )}
      {currStep === 'complete' && <SignUpForm.Complete closeDialog={close} />}
    </Dialog>
  )
}

export default SignUpDialog
