import {
  Dialog,
  ReCaptchaProvider,
  SignUpForm,
  useDialogSwitch,
  useEventListener,
  useStep,
  VerificationLinkSent,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_SIGNUP_DIALOG } from '~/common/enums'

type Step = 'init' | 'verification_sent'

const BaseSignUpDialog = () => {
  const { currStep, forward } = useStep<Step>('init')

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  const openDialog = () => {
    forward('init')
    baseOpenDialog()
  }

  useEventListener(CLOSE_ACTIVE_DIALOG, closeDialog)
  useEventListener(OPEN_SIGNUP_DIALOG, openDialog)

  return (
    <Dialog
      size="sm"
      isOpen={show}
      onDismiss={closeDialog}
      fixedHeight={currStep !== 'verification_sent'}
    >
      {currStep === 'init' && (
        <ReCaptchaProvider>
          <SignUpForm.Init
            purpose="dialog"
            submitCallback={() => {
              forward('verification_sent')
            }}
            closeDialog={closeDialog}
          />
        </ReCaptchaProvider>
      )}
      {currStep === 'verification_sent' && (
        <VerificationLinkSent
          type="register"
          purpose="dialog"
          closeDialog={closeDialog}
        />
      )}
    </Dialog>
  )
}

const SignUpDialog = () => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_SIGNUP_DIALOG, openDialog)
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseSignUpDialog />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

export default SignUpDialog
