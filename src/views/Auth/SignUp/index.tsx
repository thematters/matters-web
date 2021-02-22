import {
  Head,
  Layout,
  ReCaptchaProvider,
  SignUpForm,
  useRoute,
  useStep,
  VerificationLinkSent,
} from '~/components'

type Step = 'init' | 'verification_sent' | 'password' | 'complete'

const SignUp = () => {
  const { getQuery } = useRoute()
  const email = getQuery('email')
  const code = getQuery('code')
  const displayName = getQuery('displayName')

  const initStep = email && code && displayName ? 'password' : 'init'
  const { currStep, forward } = useStep<Step>(initStep)

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'register' }} />

      {currStep === 'init' && (
        <ReCaptchaProvider>
          <SignUpForm.Init
            purpose="page"
            submitCallback={() => {
              forward('verification_sent')
            }}
          />
        </ReCaptchaProvider>
      )}

      {currStep === 'verification_sent' && (
        <VerificationLinkSent type="register" purpose="page" />
      )}

      {currStep === 'password' && (
        <SignUpForm.Password
          email={email}
          code={code}
          displayName={displayName}
          purpose="page"
          submitCallback={() => {
            forward('complete')
          }}
        />
      )}

      {currStep === 'complete' && <SignUpForm.Complete purpose="page" />}
    </Layout.Main>
  )
}

export default SignUp
