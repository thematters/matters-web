import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import SignUpComplete from '~/components/Form/SignUpComplete'
import { SignUpInitForm, SignUpProfileForm } from '~/components/Form/SignUpForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Head } from '~/components/Head'
import SetupLikeCoin from '~/components/SetupLikeCoin'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

const SignUp = () => {
  const [step, setStep] = useState<Step>('signUp')
  const { updateHeaderState } = useContext(HeaderContext)
  useEffect(() => {
    updateHeaderState({ type: 'signUp' })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  const containerClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-offset-sm-1',
    'l-col-md-4',
    'l-offset-md-2',
    'l-col-lg-6',
    'l-offset-lg-3',
    'container'
  )

  return (
    <main className="l-row row">
      <Head
        title={{
          zh_hant: TEXT.zh_hant.register,
          zh_hans: TEXT.zh_hans.register
        }}
      />

      <article className={containerClass}>
        {step === 'signUp' && (
          <SignUpInitForm
            purpose="page"
            submitCallback={() => {
              setStep('profile')
            }}
            scrollLock={false}
          />
        )}
        {step === 'profile' && (
          <SignUpProfileForm
            purpose="page"
            submitCallback={() => {
              setStep('setupLikeCoin')
            }}
            scrollLock={false}
          />
        )}
        {step === 'setupLikeCoin' && (
          <SetupLikeCoin
            submitCallback={() => {
              setStep('complete')
            }}
            scrollLock={false}
          />
        )}
        {step === 'complete' && (
          <SignUpComplete purpose="page" scrollLock={false} />
        )}
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default SignUp
