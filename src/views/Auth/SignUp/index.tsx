import { Head, Layout, SetupLikeCoin, SignUpForm, useStep } from '~/components'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

const SignUp = () => {
  const { currStep, forward } = useStep<Step>('signUp')

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'register' }} />

      {currStep === 'signUp' && (
        <SignUpForm.Init
          purpose="page"
          submitCallback={() => {
            forward('profile')
          }}
        />
      )}

      {currStep === 'profile' && (
        <SignUpForm.Profile
          purpose="page"
          submitCallback={() => {
            forward('setupLikeCoin')
          }}
        />
      )}

      {currStep === 'setupLikeCoin' && (
        <SetupLikeCoin
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
