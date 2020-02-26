import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import {
  Head,
  SetupLikeCoin,
  SignUpComplete,
  SignUpInitForm,
  SignUpProfileForm
} from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import styles from '../styles.css'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

const SignUp = () => {
  const [step, setStep] = useState<Step>('signUp')

  const { updateHeaderState } = useContext(HeaderContext)

  useEffect(() => {
    updateHeaderState({ type: 'signUp' })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  const containerClass = classNames({
    container: true,
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3': true
  })

  return (
    <main className="l-row full">
      <Head title={{ id: 'register' }} />

      <article className={containerClass}>
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
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default SignUp
