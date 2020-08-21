import { useContext, useState } from 'react'

import {
  ChangeEmailForm,
  Head,
  Layout,
  useStep,
  ViewerContext,
} from '~/components'

type Step = 'request' | 'confirm' | 'complete'

const ChangeEmail = () => {
  const viewer = useContext(ViewerContext)
  const { currStep, forward } = useStep<Step>('request')
  const [data, setData] = useState<{ email: string; codeId: string }>({
    email: viewer.info.email,
    codeId: '',
  })
  const requestCallback = (codeId: string) => {
    setData({ ...data, codeId })
    forward('confirm')
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'changeEmail' }} />

      {currStep === 'request' && (
        <ChangeEmailForm.Request
          defaultEmail={data.email}
          purpose="page"
          submitCallback={requestCallback}
        />
      )}

      {currStep === 'confirm' && (
        <ChangeEmailForm.Confirm
          oldData={data}
          purpose="page"
          submitCallback={() => forward('complete')}
        />
      )}

      {currStep === 'complete' && <ChangeEmailForm.Complete purpose="page" />}
    </Layout.Main>
  )
}

export default ChangeEmail
