import { useState } from 'react'

import { Head, Layout, SetupLikeCoin, SignUpForm } from '~/components'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

const SignUp = () => {
  const [step, setStep] = useState<Step>('signUp')

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'register' }} />

      {step === 'signUp' && (
        <SignUpForm.Init
          purpose="page"
          submitCallback={() => {
            setStep('profile')
          }}
        />
      )}

      {step === 'profile' && (
        <SignUpForm.Profile
          purpose="page"
          submitCallback={() => {
            setStep('setupLikeCoin')
          }}
        />
      )}

      {step === 'setupLikeCoin' && (
        <SetupLikeCoin
          purpose="page"
          submitCallback={() => {
            setStep('complete')
          }}
        />
      )}

      {step === 'complete' && <SignUpForm.Complete purpose="page" />}
    </Layout.Main>
  )
}

export default SignUp
