import { useContext } from 'react'

import {
  ChangePasswordForm,
  Head,
  Layout,
  useRoute,
  useStep,
  VerificationLinkSent,
  ViewerContext,
} from '~/components'

type Step = 'request' | 'verification_sent' | 'confirm' | 'complete'

const ChangePassword = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const email = getQuery('email')
  const code = getQuery('code')

  const initStep = code ? 'confirm' : 'request'
  const { currStep, forward } = useStep<Step>(initStep)

  return (
    <Layout.Main>
      <Head title={{ id: 'changePassword' }} />

      {currStep === 'request' && (
        <ChangePasswordForm.Request
          defaultEmail={viewer.info.email}
          type="change"
          purpose="page"
          submitCallback={() => forward('verification_sent')}
        />
      )}

      {currStep === 'verification_sent' && (
        <VerificationLinkSent type="changePassword" purpose="page" />
      )}

      {currStep === 'confirm' && (
        <ChangePasswordForm.Confirm
          email={email}
          code={code}
          type="change"
          purpose="page"
          submitCallback={() => forward('complete')}
        />
      )}

      {currStep === 'complete' && (
        <ChangePasswordForm.Complete type="change" purpose="page" />
      )}
    </Layout.Main>
  )
}

export default ChangePassword
