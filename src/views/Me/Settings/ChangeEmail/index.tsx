import { useContext, useState } from 'react'

import { ChangeEmailForm, Head, Layout, ViewerContext } from '~/components'

type Step = 'request' | 'confirm' | 'complete'

const ChangeEmail = () => {
  const viewer = useContext(ViewerContext)
  const [step, setStep] = useState<Step>('request')
  const [data, setData] = useState<{ email: string; codeId: string }>({
    email: viewer.info.email,
    codeId: '',
  })
  const requestCallback = (codeId: string) => {
    setData({ ...data, codeId })
    setStep('confirm')
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'changeEmail' }} />

      {step === 'request' && (
        <ChangeEmailForm.Request
          defaultEmail={data.email}
          purpose="page"
          submitCallback={requestCallback}
        />
      )}

      {step === 'confirm' && (
        <ChangeEmailForm.Confirm
          oldData={data}
          purpose="page"
          submitCallback={() => setStep('complete')}
        />
      )}

      {step === 'complete' && <ChangeEmailForm.Complete purpose="page" />}
    </Layout.Main>
  )
}

export default ChangeEmail
