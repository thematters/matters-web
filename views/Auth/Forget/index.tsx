import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import {
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm
} from '~/components/Form/PasswordChangeForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Head } from '~/components/Head'
import { LanguageContext } from '~/components/Language'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

const Forget = () => {
  const { lang } = useContext(LanguageContext)
  const [step, setStep] = useState('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      next: 'rest'
    },
    reset: {
      prev: 'request',
      next: 'complete'
    }
  })

  const { updateHeaderState } = useContext(HeaderContext)
  useEffect(() => {
    updateHeaderState({ type: 'forgot' })
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
  const formClass = ['l-col-4', 'l-col-sm-6', 'l-col-md-6', 'l-col-lg-8']

  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData(prev => {
      return {
        ...prev,
        request: {
          ...prev.request,
          email,
          codeId
        }
      }
    })
    setStep('reset')
  }
  const backPreviousStep = (event: any) => {
    event.stopPropagation()
    setStep('request')
  }

  const Complete = () => (
    <>
      <div className="complete">
        <div className="message">
          {translate({
            zh_hant: TEXT.zh_hant.resetPasswordSuccess,
            zh_hans: TEXT.zh_hans.resetPasswordSuccess,
            lang
          })}
        </div>
        <div className="hint">
          {translate({
            zh_hant: TEXT.zh_hant.useNewPassword,
            zh_hans: TEXT.zh_hans.useNewPassword,
            lang
          })}
          。
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      <main className="l-row">
        <Head
          title={{
            zh_hant: TEXT.zh_hant.forgetPassword,
            zh_hans: TEXT.zh_hans.forgetPassword
          }}
        />

        <article className={containerClass}>
          {step === 'request' && (
            <PasswordChangeRequestForm
              defaultEmail={data.request.email}
              extraClass={formClass}
              purpose="forget"
              container="page"
              submitCallback={requestCodeCallback}
            />
          )}
          {step === 'reset' && (
            <PasswordChangeConfirmForm
              extraClass={formClass}
              codeId={data.request.codeId}
              container="page"
              backPreviousStep={backPreviousStep}
              submitCallback={() => setStep('complete')}
            />
          )}
          {step === 'complete' && <Complete />}
        </article>
      </main>
      <style jsx>{styles}</style>
    </>
  )
}

export default Forget
