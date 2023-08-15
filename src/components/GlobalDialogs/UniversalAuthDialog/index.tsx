import dynamic from 'next/dynamic'
import { useState } from 'react'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEST_ID,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import {
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

const BaseUniversalAuthDialog = ({
  initSource,
}: {
  initSource?: UNIVERSAL_AUTH_SOURCE
}) => {
  const [source, setSource] = useState<UNIVERSAL_AUTH_SOURCE>(
    initSource || UNIVERSAL_AUTH_SOURCE.enter
  )
  const { currStep, forward } = useStep<Step>('select-login-method')
  const [email, setEmail] = useState('')

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
      setSource(payload?.source || UNIVERSAL_AUTH_SOURCE.enter)
      openDialog()
    }
  )

  return (
    <Dialog isOpen={show} onDismiss={closeDialog} testId={TEST_ID.DIALOG_AUTH}>
      {currStep === 'select-login-method' && (
        <DynamicSelectAuthMethodForm
          purpose="dialog"
          source={source}
          gotoWalletAuth={() => forward('wallet-select')}
          gotoEmailLogin={() => forward('email-login')}
          gotoEmailSignup={() => forward('email-sign-up-init')}
          closeDialog={closeDialog}
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
          submitCallback={(type?: AuthResultType) => {
            if (type === AuthResultType.Signup) {
              forward('complete')
            }
          }}
          closeDialog={closeDialog}
          back={() => forward('select-login-method')}
        />
      )}

      {/* Email */}
      {currStep === 'email-login' && (
        <DynamicEmailLoginForm
          purpose="dialog"
          closeDialog={closeDialog}
          gotoEmailSignUp={() => forward('email-sign-up-init')}
          gotoResetPassword={() => forward('reset-password-request')}
          back={() => forward('select-login-method')}
        />
      )}
      {currStep === 'email-sign-up-init' && (
        <DynamicEmailSignUpFormInit
          purpose="dialog"
          submitCallback={(email: string) => {
            setEmail(email)
            forward('email-verification-sent')
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
  const [source, setSource] = useState<UNIVERSAL_AUTH_SOURCE>()

  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(
      OPEN_UNIVERSAL_AUTH_DIALOG,
      (payload: { [key: string]: any }) => {
        setSource(payload?.source || '')
        openDialog()
      }
    )
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseUniversalAuthDialog initSource={source} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

export default UniversalAuthDialog
