import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useConnect } from 'wagmi'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEST_ID,
} from '~/common/enums'
import { WalletType } from '~/common/utils'
import {
  AuthFeedType,
  Dialog,
  Spinner,
  useDialogSwitch,
  useEventListener,
  useStep,
  VerificationLinkSent,
} from '~/components'
import { AuthResultType } from '~/gql/graphql'

const DynamicSelectAuthMethodForm = dynamic<any>(
  () =>
    import('~/components/Forms/SelectAuthMethodForm').then(
      (mod) => mod.SelectAuthMethodForm
    ),
  { ssr: false, loading: Spinner }
)
const DynamicChangePasswordFormRequest = dynamic(
  () => import('~/components/Forms/ChangePasswordForm/Request'),
  { ssr: false, loading: Spinner }
)
const DynamicEmailLoginForm = dynamic<any>(
  () =>
    import('~/components/Forms/EmailLoginForm').then(
      (mod) => mod.EmailLoginForm
    ),
  { ssr: false, loading: Spinner }
)
const DynamicEmailSignUpFormInit = dynamic(
  () => import('~/components/Forms/EmailSignUpForm/Init'),
  { ssr: false, loading: Spinner }
)
const DynamicWalletAuthFormSelect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Select'),
  { ssr: false, loading: Spinner }
)
const DynamicWalletAuthFormConnect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Connect'),
  { ssr: false, loading: Spinner }
)
const DynamicEmailSignUpFormComplete = dynamic(
  () => import('~/components/Forms/EmailSignUpForm/Complete'),
  { ssr: false, loading: Spinner }
)

type Step =
  | 'select-login-method'
  // wallet
  | 'wallet-select'
  | 'wallet-connect'
  // email
  | 'email-login'
  | 'email-sign-up-init'
  | 'email-verification-sent'
  | 'reset-password-request'
  // misc
  | 'complete'

const BaseUniversalAuthDialog = () => {
  const { currStep, forward } = useStep<Step>('select-login-method')
  const [email, setEmail] = useState('')

  const { connectors } = useConnect()
  const injectedConnector = connectors.find((c) => c.id === 'metaMask')
  const [authTypeFeed, setAuthTypeFeed] = useState<AuthFeedType>(
    injectedConnector?.ready ? 'wallet' : 'normal'
  )

  const [walletType, setWalletType] = useState<WalletType>('Metamask')

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  const openDialog = () => {
    forward('select-login-method')
    baseOpenDialog()
  }

  useEventListener(CLOSE_ACTIVE_DIALOG, closeDialog)
  useEventListener(
    OPEN_UNIVERSAL_AUTH_DIALOG,
    (payload: { [key: string]: any }) => {
      openDialog()
    }
  )

  return (
    <Dialog isOpen={show} onDismiss={closeDialog} testId={TEST_ID.DIALOG_AUTH}>
      {currStep === 'select-login-method' && (
        <DynamicSelectAuthMethodForm
          gotoWalletConnect={(type: WalletType) => {
            setWalletType(type)
            forward('wallet-connect')
          }}
          gotoEmailLogin={() => forward('email-login')}
          gotoEmailSignup={() => forward('email-sign-up-init')}
          closeDialog={closeDialog}
          type={authTypeFeed}
        />
      )}

      {/* Wallet */}
      {currStep === 'wallet-select' && (
        <DynamicWalletAuthFormSelect
          purpose="dialog"
          submitCallback={() => {
            forward('wallet-connect')
          }}
          closeDialog={closeDialog}
          back={() => forward('select-login-method')}
        />
      )}
      {currStep === 'wallet-connect' && (
        <DynamicWalletAuthFormConnect
          purpose="dialog"
          walletType={walletType}
          submitCallback={(type?: AuthResultType) => {
            if (type === AuthResultType.Signup) {
              forward('complete')
            }
          }}
          closeDialog={closeDialog}
          back={() => forward('select-login-method')}
          gotoSignInTab={() => {
            setAuthTypeFeed('normal')
            forward('select-login-method')
          }}
        />
      )}

      {/* Email */}
      {currStep === 'email-login' && (
        <DynamicEmailLoginForm
          purpose="dialog"
          closeDialog={closeDialog}
          gotoEmailSignup={() => forward('email-sign-up-init')}
          gotoResetPassword={() => forward('reset-password-request')}
          back={() => forward('select-login-method')}
        />
      )}
      {currStep === 'email-sign-up-init' && (
        <DynamicEmailSignUpFormInit
          submitCallback={(email: string) => {
            setEmail(email)
            forward('email-verification-sent')
          }}
          gotoWalletConnect={(type) => {
            setWalletType(type)
            forward('wallet-connect')
          }}
          gotoEmailLogin={() => forward('email-login')}
          closeDialog={closeDialog}
          back={() => forward('select-login-method')}
        />
      )}
      {currStep === 'email-verification-sent' && (
        <VerificationLinkSent
          type="register"
          purpose="dialog"
          closeDialog={closeDialog}
          email={email}
        />
      )}
      {currStep === 'reset-password-request' && (
        <DynamicChangePasswordFormRequest
          type="forget"
          purpose="dialog"
          submitCallback={() => forward('email-verification-sent')}
          closeDialog={closeDialog}
          back={() => forward('email-login')}
        />
      )}

      {/* Misc */}
      {currStep === 'complete' && (
        <DynamicEmailSignUpFormComplete
          purpose="dialog"
          closeDialog={closeDialog}
        />
      )}
    </Dialog>
  )
}

const UniversalAuthDialog = () => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(
      OPEN_UNIVERSAL_AUTH_DIALOG,
      (payload: { [key: string]: any }) => {
        openDialog()
      }
    )
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseUniversalAuthDialog />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

export default UniversalAuthDialog
