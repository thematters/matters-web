import {
  Dialog,
  LoginSignUpForm,
  useDialogSwitch,
  useEventListener,
  useStep,
  VerificationLinkSent,
  WalletSignUpForm,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_SIGNUP_DIALOG } from '~/common/enums'

type Step = 'init' | 'connect_wallet' | 'verification_sent'

interface FormProps {
  initStep?: Step
}

const BaseLoginSignUpDialog: React.FC<FormProps> = ({ initStep = 'init' }) => {
  const { currStep, forward } = useStep<Step>(initStep)

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  const openDialog = () => {
    forward(initStep)
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
        <WalletSignUpForm.ConnectWallet
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

const LoginSignUpDialog: React.FC<FormProps> = ({ initStep = 'init' }) => {
  const Children = ({
    openDialog,
  }: {
    openDialog: ({ initStep }: { initStep: Step }) => void
  }) => {
    useEventListener(OPEN_LOGIN_SIGNUP_DIALOG, openDialog)
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseLoginSignUpDialog initStep={initStep} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

export default LoginSignUpDialog
