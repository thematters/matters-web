import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import {
  Head,
  PasswordChangeComplete,
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm
} from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import styles from '../styles.css'

const Forget = () => {
  const [step, setStep] = useState('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      next: 'confirm'
    },
    confirm: {
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
    setStep('confirm')
  }

  return (
    <main className="l-row full">
      <Head title={{ id: 'forgetPassword' }} />

      <article className={containerClass}>
        {step === 'request' && (
          <PasswordChangeRequestForm
            defaultEmail={data.request.email}
            type="forget"
            purpose="page"
            submitCallback={requestCodeCallback}
          />
        )}

        {step === 'confirm' && (
          <PasswordChangeConfirmForm
            codeId={data.request.codeId}
            type="forget"
            purpose="page"
            submitCallback={() => setStep('complete')}
          />
        )}

        {step === 'complete' && (
          <PasswordChangeComplete type="forget" purpose="page" />
        )}
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default Forget
