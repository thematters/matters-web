import { useState } from 'react'

import { ChangePasswordForm, Head, Layout, useStep } from '~/components'

const Forget = () => {
  const { currStep, goForward } = useStep('request')
  const [data, setData] = useState<{ email: string; codeId: string }>({
    email: '',
    codeId: '',
  })

  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData({ ...data, email, codeId })
    goForward('confirm')
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'forgetPassword' }} />

      {currStep === 'request' && (
        <ChangePasswordForm.Request
          defaultEmail={data.email}
          type="forget"
          purpose="page"
          submitCallback={requestCodeCallback}
        />
      )}

      {currStep === 'confirm' && (
        <ChangePasswordForm.Confirm
          codeId={data.codeId}
          type="forget"
          purpose="page"
          submitCallback={() => goForward('complete')}
        />
      )}

      {currStep === 'complete' && (
        <ChangePasswordForm.Complete type="forget" purpose="page" />
      )}
    </Layout.Main>
  )
}

export default Forget
