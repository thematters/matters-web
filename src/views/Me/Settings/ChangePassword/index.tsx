import { useContext, useState } from 'react'

import { ChangePasswordForm, Head, Layout, ViewerContext } from '~/components'

type Step = 'request' | 'confirm' | 'complete'

const ChangePassword = () => {
  const viewer = useContext(ViewerContext)
  const [step, setStep] = useState<Step>('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      prev: 'login',
      next: 'confirm',
      email: viewer.info.email,
    },
    confirm: {
      prev: 'request',
      next: 'complete',
    },
    complete: {},
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
      <Head title={{ id: 'changePassword' }} />

      {step === 'request' && (
        <ChangePasswordForm.Request
          defaultEmail={data.request.email}
          type="change"
          purpose="page"
          submitCallback={requestCodeCallback}
        />
      )}

      {step === 'confirm' && (
        <ChangePasswordForm.Confirm
          codeId={data.request.codeId}
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
