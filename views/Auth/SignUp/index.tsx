import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import { LanguageContext } from '~/components'
import SignUpComplete from '~/components/Form/SignUpComplete'
import { SignUpInitForm, SignUpProfileForm } from '~/components/Form/SignUpForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Head } from '~/components/Head'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

type Step = 'signUp' | 'profile' | 'follow' | 'complete'

const SignUp = () => {
  const { lang } = useContext(LanguageContext)
  const [step, setStep] = useState<Step>('signUp')
  const [data, setData] = useState<{ [key: string]: any }>({
    signUp: {
      title: translate({
        zh_hant: TEXT.zh_hant.register,
        zh_hans: TEXT.zh_hans.register,
        lang
      })
    },
    profile: {
      title: translate({
        zh_hant: TEXT.zh_hant.userProfile,
        zh_hans: TEXT.zh_hans.userProfile,
        lang
      })
    },
    complete: {
      title: translate({
        zh_hant: TEXT.zh_hant.registerSuccess,
        zh_hans: TEXT.zh_hans.registerSuccess,
        lang
      })
    }
  })

  const initCallback = ({ email, codeId, password }: any) => {
    setData(prev => {
      return {
        ...prev,
        signUp: {
          ...prev.signUp,
          email,
          codeId,
          password
        }
      }
    })
    setStep('profile')
  }

  const profileCallback = () => {
    setStep('complete')
  }

  const backPreviousStep = (event: any) => {
    setStep('signUp')
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
            <SignUpInitForm
              purpose="page"
              submitCallback={initCallback}
              defaultEmail={data.signUp.email}
            />
          )}
          {step === 'profile' && (
            <SignUpProfileForm
              purpose="page"
              backPreviousStep={backPreviousStep}
              submitCallback={profileCallback}
              signUpData={data.signUp}
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
