import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import { Head, PageHeader, Translate } from '~/components'
import {
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm
} from '~/components/Form/PasswordChangeForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import { TEXT } from '~/common/enums'

import PasswordChanged from './PasswordChanged'
import styles from './styles.css'

const Forget = () => {
  const [step, setStep] = useState('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      next: 'reset'
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

  const containerClass = classNames({
    container: true,
    'l-col-4 l-col-sm-4 l-offset-sm-2 l-col-lg-4 l-offset-lg-4': true
  })

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
    setStep('request')
  }

  return (
    <main className="l-row">
      <Head
        title={{
          zh_hant: TEXT.zh_hant.forgetPassword,
          zh_hans: TEXT.zh_hans.forgetPassword
        }}
      />

      <article className={containerClass}>
        <PageHeader
          title={
            <Translate
              zh_hant={TEXT.zh_hant.forgetPassword}
              zh_hans={TEXT.zh_hans.forgetPassword}
            />
          }
          hasNoBorder
        />

        <section className="content">
          {step === 'request' && (
            <PasswordChangeRequestForm
              defaultEmail={data.request.email}
              purpose="forget"
              container="page"
              submitCallback={requestCodeCallback}
            />
          )}

          {step === 'reset' && (
            <PasswordChangeConfirmForm
              codeId={data.request.codeId}
              container="page"
              backPreviousStep={backPreviousStep}
              submitCallback={() => setStep('complete')}
            />
          )}

          {step === 'complete' && <PasswordChanged />}
        </section>
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default Forget
