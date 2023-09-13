import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
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
  ReCaptchaProvider,
  Spinner,
  useDialogSwitch,
  useEventListener,
  useStep,
  VerificationLinkSent,
} from '~/components'

const DynamicSelectAuthMethodForm = dynamic<any>(
  () =>
    import('~/components/Forms/SelectAuthMethodForm').then(
      (mod) => mod.SelectAuthMethodForm
    ),
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

const DynamicWalletAuthFormConnect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Connect'),
  { ssr: false, loading: Spinner }
)
type Step =
  | 'select-login-method'
  // wallet
  | 'wallet-connect'
  // email
  | 'email-login'
  | 'email-sign-up-init'
  | 'email-verification-sent'

const BaseUniversalAuthDialog = () => {
  const { currStep, forward } = useStep<Step>('select-login-method')
  const [email, setEmail] = useState('')

  const [firstRender, setFirstRender] = useState(true)

  const { connectors } = useConnect()
  const injectedConnector = connectors.find((c) => c.id === 'metaMask')
  const [authFeedType, setAuthFeedType] = useState<AuthFeedType>('normal')

  useEffect(() => {
    if (injectedConnector?.ready && firstRender) {
      setAuthFeedType('wallet')
    }

    setFirstRender(false)
  }, [])

  const [walletType, setWalletType] = useState<WalletType>('MetaMask')

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
          purpose="dialog"
          gotoWalletConnect={(type: WalletType) => {
            setWalletType(type)
            forward('wallet-connect')
          }}
          gotoEmailLogin={() => forward('email-login')}
          gotoEmailSignup={() => forward('email-sign-up-init')}
          closeDialog={closeDialog}
          authFeedType={authFeedType}
          setAuthFeedType={setAuthFeedType}
          checkWallet={false}
        />
      )}

      {/* Wallet */}
      {currStep === 'wallet-connect' && (
        <ReCaptchaProvider>
          <DynamicWalletAuthFormConnect
            type="login"
            purpose="dialog"
            walletType={walletType}
            closeDialog={closeDialog}
            back={() => forward('select-login-method')}
            gotoSignInTab={() => {
              setAuthFeedType('normal')
              forward('select-login-method')
            }}
          />
        </ReCaptchaProvider>
      )}

      {/* Email */}
      {currStep === 'email-login' && (
        <DynamicEmailLoginForm
          purpose="dialog"
          closeDialog={closeDialog}
          gotoEmailSignup={() => forward('email-sign-up-init')}
          gotoWalletConnect={(type: WalletType) => {
            setWalletType(type)
            forward('wallet-connect')
          }}
          back={() => forward('select-login-method')}
        />
      )}
      {currStep === 'email-sign-up-init' && (
        <ReCaptchaProvider>
          <DynamicEmailSignUpFormInit
            purpose="dialog"
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
        </ReCaptchaProvider>
      )}
      {currStep === 'email-verification-sent' && (
        <VerificationLinkSent
          type="register"
          purpose="dialog"
          closeDialog={closeDialog}
          email={email}
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
