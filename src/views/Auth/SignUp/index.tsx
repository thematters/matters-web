import { Head, Layout, SetupLikeCoin, SignUpForm, useStep } from '~/components'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

const SignUp = () => {
  const { currStep, goForward } = useStep<Step>('signUp')

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'register' }} />

      {currStep === 'signUp' && (
        <SignUpForm.Init
          purpose="page"
          submitCallback={() => {
            goForward('profile')
          }}
        />
      )}

      {currStep === 'profile' && (
        <SignUpForm.Profile
          purpose="page"
          submitCallback={() => {
            goForward('setupLikeCoin')
          }}
        />
      )}

      {currStep === 'setupLikeCoin' && (
        <SetupLikeCoin
          purpose="page"
          submitCallback={() => {
            goForward('complete')
          }}
        />
      )}

      {currStep === 'complete' && <SignUpForm.Complete purpose="page" />}
    </Layout.Main>
  )
}

export default SignUp
