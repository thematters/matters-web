import {
  Head,
  Layout,
  LoginSignUpForm,
  ReCaptchaProvider,
  SignUpForm,
  useRoute,
  useStep,
  // VerificationLinkSent,
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
          <LoginSignUpForm.Init
            purpose="page"
            submitCallback={() => {
              forward('complete')
            }}
          />
        </ReCaptchaProvider>
      )}

      {currStep === 'complete' && <SignUpForm.Complete purpose="page" />}
    </Layout.Main>
  )
}

export default SignUp
