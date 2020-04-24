import { useState } from 'react'

import { ChangePasswordForm, Head, Layout } from '~/components'

const Forget = () => {
  const [step, setStep] = useState('request')
  const [data, setData] = useState<{ email: string; codeId: string }>({
    email: '',
    codeId: '',
  })

  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData({ ...data, email, codeId })
    setStep('confirm')
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'forgetPassword' }} />

      {step === 'request' && (
        <ChangePasswordForm.Request
          defaultEmail={data.email}
          type="forget"
          purpose="page"
          submitCallback={requestCodeCallback}
        />
      )}

      {step === 'confirm' && (
        <ChangePasswordForm.Confirm
          codeId={data.codeId}
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
