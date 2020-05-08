import { useContext, useState } from 'react'

import { ChangePasswordForm, Head, Layout, ViewerContext } from '~/components'

type Step = 'request' | 'confirm' | 'complete'

const ChangePassword = () => {
  const viewer = useContext(ViewerContext)

  const [step, setStep] = useState<Step>('request')
  const [data, setData] = useState<{ email: string; codeId: string }>({
    email: viewer.info.email,
    codeId: '',
  })

  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData({ ...data, email, codeId })
    setStep('confirm')
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'changePassword' }} />

      {step === 'request' && (
        <ChangePasswordForm.Request
          defaultEmail={data.email}
          type="change"
          purpose="page"
          submitCallback={requestCodeCallback}
        />
      )}

      {step === 'confirm' && (
        <ChangePasswordForm.Confirm
          codeId={data.codeId}
          type="change"
          purpose="page"
          submitCallback={() => setStep('complete')}
        />
      )}

      {step === 'complete' && (
        <ChangePasswordForm.Complete type="change" purpose="page" />
      )}
    </Layout.Main>
  )
}

export default ChangePassword
