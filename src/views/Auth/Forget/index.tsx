import { useState } from 'react'

import { ChangePasswordForm, Head, Layout } from '~/components'

const Forget = () => {
  const [step, setStep] = useState('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      next: 'confirm',
    },
    confirm: {
      prev: 'request',
      next: 'complete',
    },
  })

  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData((prev) => {
      return {
        ...prev,
        request: {
          ...prev.request,
          email,
          codeId,
        },
      }
    })
    setStep('confirm')
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'forgetPassword' }} />

      {step === 'request' && (
        <ChangePasswordForm.Request
          defaultEmail={data.request.email}
          type="forget"
          purpose="page"
          submitCallback={requestCodeCallback}
        />
      )}

      {step === 'confirm' && (
        <ChangePasswordForm.Confirm
          codeId={data.request.codeId}
          type="forget"
          purpose="page"
          submitCallback={() => setStep('complete')}
        />
      )}

      {step === 'complete' && (
        <ChangePasswordForm.Complete type="forget" purpose="page" />
      )}
    </Layout.Main>
  )
}

export default Forget
