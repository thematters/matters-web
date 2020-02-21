import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import {
  Head,
  PageHeader,
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm,
  Translate
} from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import { TEXT } from '~/common/enums'

import styles from '../styles.css'
import PasswordChanged from './PasswordChanged'

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
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3': true
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

  return (
    <main className="l-row full">
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

        {step === 'request' && (
          <PasswordChangeRequestForm
            defaultEmail={data.request.email}
            type="forget"
            purpose="page"
            submitCallback={requestCodeCallback}
          />
        )}

        {step === 'reset' && (
          <PasswordChangeConfirmForm
            codeId={data.request.codeId}
            type="forget"
            purpose="page"
            submitCallback={() => setStep('complete')}
          />
        )}

        {step === 'complete' && <PasswordChanged />}
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default Forget
