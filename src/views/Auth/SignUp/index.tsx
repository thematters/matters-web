import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import { Head, PageHeader, Translate } from '~/components'
import SignUpComplete from '~/components/Form/SignUpComplete'
import { SignUpInitForm, SignUpProfileForm } from '~/components/Form/SignUpForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'
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

  const containerClass = classNames({
    container: true,
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3': true
  })

  return (
    <main className="l-row row">
      <Head
        title={{
          zh_hant: TEXT.zh_hant.register,
          zh_hans: TEXT.zh_hans.register
        }}
      />

      <article className={containerClass}>
        <PageHeader
          title={
            <Translate
              zh_hant={TEXT.zh_hant.register}
              zh_hans={TEXT.zh_hans.register}
            />
          }
          hasNoBorder
        />

        <section className="content">
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
              submitCallback={() => {
                setStep('complete')
              }}
            />
          )}
          {step === 'complete' && <SignUpComplete purpose="page" />}
        </section>
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default SignUp
