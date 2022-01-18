import {
  Dialog,
  ReCaptchaProvider,
  SignUpForm,
  useDialogSwitch,
  useEventListener,
  useStep,
  WalletSignUpForm,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_WALLET_SIGNUP_DIALOG } from '~/common/enums'

import { AuthResultType } from '@/__generated__/globalTypes'

type Step = 'connect-wallet' | 'select-account' | 'verify-email' | 'complete'

const BaseSignUpDialog = () => {
  const { currStep, forward } = useStep<Step>('connect-wallet')

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  const openDialog = () => {
    forward('connect-wallet')
    baseOpenDialog()
  }

  useEventListener(CLOSE_ACTIVE_DIALOG, closeDialog)
  useEventListener(OPEN_WALLET_SIGNUP_DIALOG, openDialog)

  return (
    <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
      {currStep === 'connect-wallet' && (
        <WalletSignUpForm.ConnectWallet
          purpose="dialog"
          submitCallback={() => {
            forward('select-account')
          }}
          closeDialog={closeDialog}
        />
      )}
      {currStep === 'select-account' && (
        <ReCaptchaProvider>
          <WalletSignUpForm.SelectAccount // Init
            purpose="dialog"
            submitCallback={(ethAddress: string, type: AuthResultType) => {
              forward(
                type === AuthResultType.Signup ? 'verify-email' : 'complete'
              )
            }}
            closeDialog={closeDialog}
          />
        </ReCaptchaProvider>
      )}
      {currStep === 'verify-email' && (
        <WalletSignUpForm.Verify
          purpose="dialog"
          submitCallback={() => {
            forward('complete')
          }}
          closeDialog={closeDialog}
        />
      )}
      {currStep === 'complete' && <SignUpForm.Complete purpose="page" />}
    </Dialog>
  )
}

const WalletSignUpDialog = () => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_WALLET_SIGNUP_DIALOG, openDialog)
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseSignUpDialog />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

export default WalletSignUpDialog
