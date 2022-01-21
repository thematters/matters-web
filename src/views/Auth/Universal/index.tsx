import {
  EmailLoginForm,
  EmailSignUpForm,
  Head,
  Layout,
  ReCaptchaProvider,
  SelectAuthMethodForm,
  useRoute,
  useStep,
  VerificationLinkSent,
  WalletAuthForm,
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
      <Head title={{ id: 'authEntries' }} />

      {currStep === 'select-login-method' && (
        <SelectAuthMethodForm
          purpose="page"
          gotoWalletAuth={() => forward('wallet-select')}
          gotoEmailLogin={() => forward('email-login')}
        />
      )}

      {/* Wallet */}
      {currStep === 'wallet-select' && (
        <WalletAuthForm.Select
          purpose="page"
          submitCallback={() => {
            forward('wallet-connect')
          }}
          back={() => forward('select-login-method')}
        />
      )}
      {currStep === 'wallet-connect' && (
        <WalletAuthForm.Connect
          purpose="page"
          submitCallback={(type?: AuthResultType) => {
            forward(
              type === AuthResultType.Signup ? 'wallet-verify' : 'complete'
            )
          }}
          back={() => forward('wallet-select')}
        />
      )}
      {currStep === 'wallet-verify' && (
        <WalletAuthForm.Verify
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
          back={() => forward('select-login-method')}
        />
      )}
      {currStep === 'email-sign-up-init' && (
        <ReCaptchaProvider>
          <EmailSignUpForm.Init
            purpose="page"
            submitCallback={() => forward('email-verification-sent')}
            gotoEmailLogin={() => forward('email-login')}
            back={() => forward('email-login')}
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
