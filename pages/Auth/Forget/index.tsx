import classNames from 'classnames'
import { useContext, useState } from 'react'

import ResetCodeForm from '~/components/Form/ResetCodeForm'
import ResetForm from '~/components/Form/ResetForm'
import { LanguageContext } from '~/components/Language'

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
            zh_hant: '密碼重置成功',
            zh_hans: '密码重置成功',
            lang
          })}
        </div>
        <div className="hint">
          {translate({
            zh_hant: '請使用新的密碼重新登入',
            zh_hans: '请使用新的密码重新登入',
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
      <main className="l-row row">
        <article className={containerClass}>
          {step === 'request' && (
            <ResetCodeForm
              defaultEmail={data.request.email}
              extraClass={formClass}
              purpose="page"
              submitCallback={requestCodeCallback}
            />
          )}
          {step === 'reset' && (
            <ResetForm
              extraClass={formClass}
              codeId={data.request.codeId}
              purpose="page"
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
