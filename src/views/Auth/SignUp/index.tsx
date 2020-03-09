import { useState } from 'react'

import {
  Head,
  Layout,
  SetupLikeCoin,
  SignUpComplete,
  SignUpInitForm,
  SignUpProfileForm
} from '~/components'

import styles from '../styles.css'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

const SignUp = () => {
  const [step, setStep] = useState<Step>('signUp')

  return (
    <div className="auth-page">
      <Layout>
        <Head title={{ id: 'register' }} />

        {step === 'signUp' && (
          <SignUpInitForm
            purpose="page"
            submitCallback={() => {
              setStep('profile')
            }}
          />
        )}

        {step === 'profile' && (
          <SignUpProfileForm
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

        {step === 'complete' && <SignUpComplete purpose="page" />}
      </Layout>

      <style jsx>{styles}</style>
    </div>
  )
}

export default SignUp
