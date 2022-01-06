import {
  Dialog,
  // ReCaptchaProvider,
  LoginSignUpForm,
  useDialogSwitch,
  useEventListener,
  useStep,
  VerificationLinkSent,
} from '~/components'

import {
  CLOSE_ACTIVE_DIALOG,
  // OPEN_SIGNUP_DIALOG,
  OPEN_LOGIN_SIGNUP_DIALOG,
} from '~/common/enums'

type Step = 'init' | 'connect_wallet' | 'verification_sent'

const BaseLoginSignUpDialog = () => {
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
  useEventListener(OPEN_LOGIN_SIGNUP_DIALOG, openDialog)

  return (
    <Dialog
      size="sm"
      isOpen={show}
      onDismiss={closeDialog}
      fixedHeight={currStep !== 'verification_sent'}
    >
      {currStep === 'init' && (
        <LoginSignUpForm.Init
          purpose="dialog"
          submitCallback={() => {
            forward('connect_wallet')
          }}
          closeDialog={closeDialog}
        />
      )}
      {currStep === 'connect_wallet' && (
        <LoginSignUpForm.ConnectWallet
          purpose="dialog"
          submitCallback={() => {
            console.log('submit connect-wallet')
          }}
          closeDialog={closeDialog}
        />
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

const LoginSignUpDialog = () => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_LOGIN_SIGNUP_DIALOG, openDialog)
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseLoginSignUpDialog />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

export default LoginSignUpDialog
