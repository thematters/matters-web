import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'

import { PATHS, STORAGE_KEY_REFERRAL_CODE } from '~/common/enums'
import { storage } from '~/common/utils'
import {
  Head,
  Layout,
  ReCaptchaProvider,
  Spinner,
  useRoute,
  useStep,
  VerificationLinkSent,
  ViewerContext,
} from '~/components'
import { AuthResultType } from '~/gql/graphql'

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
const DynamicWalletAuthFormSelect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Select'),
  { ssr: false, loading: Spinner }
)
const DynamicWalletAuthFormConnect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Connect'),
  { ssr: false, loading: Spinner }
)
const DynamicEmailSignUpFormPassword = dynamic(
  () => import('~/components/Forms/EmailSignUpForm/Password'),
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
  | 'email-sign-up-password'
  | 'email-verification-sent'
  // misc
  | 'complete'

const UniversalAuth = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery, router } = useRoute()
  const email = getQuery('email')
  const code = getQuery('code')
  const referralCode = getQuery('referral')
  const displayName = getQuery('displayName')

  const initStep =
    email && code && displayName
      ? 'email-sign-up-password'
      : 'select-login-method'
  const { currStep, forward } = useStep<Step>(initStep)

  useEffect(() => {
    if (viewer.id) {
      router.push(PATHS.HOME)
      return
    }
    if (referralCode) {
      storage.set(STORAGE_KEY_REFERRAL_CODE, { referralCode })
    }
  }, [viewer.id])

  return (
    <Layout.Main>
      <Head title={{ id: 'authEntries' }} />

      {currStep === 'select-login-method' && (
        <DynamicSelectAuthMethodForm
          purpose="page"
          gotoWalletAuth={() => forward('wallet-select')}
          gotoEmailLogin={() => forward('email-login')}
        />
      )}

      {/* Wallet */}
      {currStep === 'wallet-select' && (
        <ReCaptchaProvider>
          <DynamicWalletAuthFormSelect
            purpose="page"
            submitCallback={() => {
              forward('wallet-connect')
            }}
            back={() => forward('select-login-method')}
          />
        </ReCaptchaProvider>
      )}
      {currStep === 'wallet-connect' && (
        <DynamicWalletAuthFormConnect
          purpose="page"
          submitCallback={(type?: AuthResultType) => {
            if (type === AuthResultType.Signup) {
              forward('complete')
            }
          }}
          back={() => forward('wallet-select')}
        />
      )}

      {/* Email */}
      {currStep === 'email-login' && (
        <DynamicEmailLoginForm
          purpose="page"
          gotoEmailSignUp={() => forward('email-sign-up-init')}
          back={() => forward('select-login-method')}
        />
      )}
      {currStep === 'email-sign-up-init' && (
        <ReCaptchaProvider>
          <DynamicEmailSignUpFormInit
            purpose="page"
            submitCallback={() => forward('email-verification-sent')}
            gotoEmailLogin={() => forward('email-login')}
            back={() => forward('email-login')}
          />
        </ReCaptchaProvider>
      )}
      {currStep === 'email-sign-up-password' && (
        <DynamicEmailSignUpFormPassword
          email={email}
          code={code}
          displayName={displayName}
          purpose="page"
          submitCallback={() => forward('complete')}
        />
      )}
      {currStep === 'email-verification-sent' && (
        <VerificationLinkSent type="changePassword" purpose="page" />
      )}

      {/* Misc */}
      {currStep === 'complete' && (
        <DynamicEmailSignUpFormComplete purpose="page" />
      )}
    </Layout.Main>
  )
}

export default UniversalAuth
