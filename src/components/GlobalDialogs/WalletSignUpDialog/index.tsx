// import { useWeb3React } from '@web3-react/core'
// import { ethers } from 'ethers'

import {
  Dialog,
  ReCaptchaProvider,
  SignUpForm,
  useDialogSwitch,
  useEventListener,
  useStep,
  // VerificationLinkSent,
  WalletSignUpForm,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_WALLET_SIGNUP_DIALOG } from '~/common/enums'

type Step = 'init' | 'verify_email' | 'complete'

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
  useEventListener(OPEN_WALLET_SIGNUP_DIALOG, openDialog)

  // const { account, library } = useWeb3React<ethers.providers.Web3Provider>()

  return (
    <Dialog
      size="sm"
      isOpen={show}
      onDismiss={closeDialog}
      // fixedHeight={currStep !== 'verification_sent'}
    >
      {currStep === 'init' && (
        <ReCaptchaProvider>
          <WalletSignUpForm.Init
            purpose="dialog"
            submitCallback={(ethAddress: string) => {
              console.log('after init:', ethAddress)
              forward('verify_email')
            }}
            closeDialog={closeDialog}
          />
        </ReCaptchaProvider>
      )}
      {currStep === 'verify_email' && (
        <WalletSignUpForm.Verify
          purpose="dialog"
          submitCallback={() => {
            forward('complete')
          }}
          closeDialog={closeDialog}
        />
      )}
      {currStep === 'complete' && <SignUpForm.Complete purpose="page" />}
      {/* <pre>{JSON.stringify({ account })}</pre> */}
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
