import {
  EmailLoginForm,
  EmailSignUpForm,
  Head,
  Layout,
  ReCaptchaProvider,
  SelectLoginMethodForm,
  useRoute,
  useStep,
  VerificationLinkSent,
  WalletLoginForm,
} from '~/components'

import { AuthResultType } from '@/__generated__/globalTypes'

type Step =
  | 'select-login-method'
  // wallet
  | 'wallet-select'
  | 'wallet-connect'
  | 'wallet-verify'
  // email
  | 'email-login'
  | 'email-sign-up-init'
  | 'email-sign-up-password'
  | 'email-verification-sent'
  // misc
  | 'complete'

const UniversalAuth = () => {
  const { getQuery } = useRoute()
  const email = getQuery('email')
  const code = getQuery('code')
  const displayName = getQuery('displayName')

  const initStep =
    email && code && displayName
      ? 'email-sign-up-password'
      : 'select-login-method'
  const { currStep, forward } = useStep<Step>(initStep)

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'register' }} />

      {currStep === 'select-login-method' && (
        <SelectLoginMethodForm
          purpose="page"
          gotoWalletLogin={() => forward('wallet-select')}
          gotoEmailLogin={() => forward('email-login')}
        />
      )}

      {/* Wallet */}
      {currStep === 'wallet-select' && (
        <WalletLoginForm.Select
          purpose="page"
          submitCallback={() => {
            forward('wallet-connect')
          }}
        />
      )}
      {currStep === 'wallet-connect' && (
        <WalletLoginForm.Connect
          purpose="page"
          submitCallback={(ethAddress: string, type: AuthResultType) => {
            forward(
              type === AuthResultType.Signup ? 'wallet-verify' : 'complete'
            )
          }}
        />
      )}
      {currStep === 'wallet-verify' && (
        <WalletLoginForm.Verify
          purpose="page"
          submitCallback={() => {
            forward('complete')
          }}
        />
      )}

      {/* Email */}
      {currStep === 'email-login' && (
        <EmailLoginForm
          purpose="page"
          gotoEmailSignUp={() => forward('email-sign-up-init')}
        />
      )}
      {currStep === 'email-sign-up-init' && (
        <ReCaptchaProvider>
          <EmailSignUpForm.Init
            purpose="page"
            submitCallback={() => forward('email-verification-sent')}
            gotoEmailLogin={() => forward('email-login')}
          />
        </ReCaptchaProvider>
      )}
      {currStep === 'email-sign-up-password' && (
        <EmailSignUpForm.Password
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
      {currStep === 'complete' && <EmailSignUpForm.Complete purpose="page" />}
    </Layout.Main>
  )
}

export default UniversalAuth
