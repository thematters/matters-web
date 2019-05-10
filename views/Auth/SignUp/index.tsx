import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import SignUpComplete from '~/components/Form/SignUpComplete'
import { SignUpInitForm, SignUpProfileForm } from '~/components/Form/SignUpForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Head } from '~/components/Head'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

type Step = 'signUp' | 'profile' | 'complete'

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
  const childClass = ['l-col-4', 'l-col-sm-6', 'l-col-md-6', 'l-col-lg-8']

  const signUpCallback = () => setStep('profile')
  const signUpProfileCallback = () => setStep('complete')

  return (
    <>
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
              extraClass={childClass}
              purpose="page"
              submitCallback={signUpCallback}
            />
          )}
          {step === 'profile' && (
            <SignUpProfileForm
              extraClass={childClass}
              purpose="page"
              submitCallback={signUpProfileCallback}
            />
          )}
          {step === 'complete' && (
            <div className={classNames(childClass)}>
              <SignUpComplete />
            </div>
          )}
        </article>
      </main>
      <style jsx>{styles}</style>
    </>
  )
}

export default SignUp
