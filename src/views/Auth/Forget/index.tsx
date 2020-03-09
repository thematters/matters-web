import { useState } from 'react'

import {
  Head,
  Layout,
  PasswordChangeComplete,
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm
} from '~/components'

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
    <div className="auth-page">
      <Layout>
        <Head title={{ id: 'forgetPassword' }} />

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
      </Layout>

      <style jsx>{styles}</style>
    </div>
  )
}

export default Forget
