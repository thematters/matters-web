import { useContext, useState } from 'react'

import {
  ChangePasswordForm,
  Head,
  Layout,
  useStep,
  ViewerContext,
} from '~/components'

type Step = 'request' | 'confirm' | 'complete'

const ChangePassword = () => {
  const viewer = useContext(ViewerContext)

  const { currStep, goForward } = useStep<Step>('request')
  const [data, setData] = useState<{ email: string; codeId: string }>({
    email: viewer.info.email,
    codeId: '',
  })

  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData({ ...data, email, codeId })
    goForward('confirm')
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'changePassword' }} />

      {currStep === 'request' && (
        <ChangePasswordForm.Request
          defaultEmail={data.email}
          type="change"
          purpose="page"
          submitCallback={requestCodeCallback}
        />
      )}

      {currStep === 'confirm' && (
        <ChangePasswordForm.Confirm
          codeId={data.codeId}
          type="change"
          purpose="page"
          submitCallback={() => goForward('complete')}
        />
      )}

      {currStep === 'complete' && (
        <ChangePasswordForm.Complete type="change" purpose="page" />
      )}
    </Layout.Main>
  )
}

export default ChangePassword
