import { useState } from 'react'

import { ChangeUserNameForm, Head, Layout } from '~/components'

type Step = 'confirm' | 'complete'

const ChangePassword = () => {
  const [step, setStep] = useState<Step>('confirm')

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'changeUserName' }} />

      {step === 'confirm' && (
        <ChangeUserNameForm.Confirm
          purpose="page"
          submitCallback={() => setStep('complete')}
        />
      )}

      {step === 'complete' && <ChangeUserNameForm.Complete purpose="page" />}
    </Layout.Main>
  )
}

export default ChangePassword
