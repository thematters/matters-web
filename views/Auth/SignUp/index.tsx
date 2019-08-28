import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import SignUpComplete from '~/components/Form/SignUpComplete'
import { SignUpInitForm, SignUpProfileForm } from '~/components/Form/SignUpForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Head } from '~/components/Head'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

type Step = 'signUp' | 'profile' | 'follow' | 'complete'

const SignUp = () => {
  const [step, setStep] = useState<Step>('signUp')

  const signUpCallback = ({ email, codeId, password }: any) => {
    setStep('profile')
  }

  const profileCallback = () => {
    setStep('complete')
  }

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
            <SignUpInitForm purpose="page" submitCallback={signUpCallback} />
          )}
          {step === 'profile' && (
            <SignUpProfileForm
              purpose="page"
              submitCallback={profileCallback}
            />
          )}
          {step === 'complete' && <SignUpComplete purpose="page" />}
        </article>
      </main>
      <style jsx>{styles}</style>
    </>
  )
}

export default SignUp
