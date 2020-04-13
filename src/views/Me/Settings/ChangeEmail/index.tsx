import { useContext, useState } from 'react'

import { ChangeEmailForm, Head, Layout, ViewerContext } from '~/components'

type Step = 'request' | 'confirm' | 'complete'

const ChangeEmail = () => {
  const viewer = useContext(ViewerContext)
  const [step, setStep] = useState<Step>('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      next: 'confirm',
      email: viewer.info.email,
    },
    confirm: {
      next: 'complete',
    },
  })
  const requestCallback = (codeId: string) => {
    setData((prev) => {
      return {
        ...prev,
        request: {
          ...prev.request,
          codeId,
        },
      }
    })
    setStep('confirm')
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'changeEmail' }} />

      {step === 'request' && (
        <ChangeEmailForm.Request
          defaultEmail={data.request.email}
          purpose="page"
          submitCallback={requestCallback}
        />
      )}

      {step === 'confirm' && (
        <ChangeEmailForm.Confirm
          oldData={data.request}
          purpose="page"
          submitCallback={() => setStep('complete')}
        />
      )}

      {step === 'complete' && <ChangeEmailForm.Complete purpose="page" />}
    </Layout.Main>
  )
}

export default ChangeEmail
