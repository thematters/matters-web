import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  ChangePasswordForm,
  Head,
  Layout,
  useStep,
  VerificationLinkSent,
  ViewerContext,
} from '~/components'

import { getQuery } from '~/common/utils'

type Step = 'request' | 'verification_sent' | 'confirm' | 'complete'

const ChangePassword = () => {
  const viewer = useContext(ViewerContext)
  const router = useRouter()
  const email = getQuery({ router, key: 'email' })
  const code = getQuery({ router, key: 'code' })

  const initStep = code ? 'confirm' : 'request'
  const { currStep, forward } = useStep<Step>(initStep)

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'changePassword' }} />

      {currStep === 'request' && (
        <ChangePasswordForm.Request
          defaultEmail={viewer.info.email}
          type="change"
          purpose="dialog"
          submitCallback={() => forward('verification_sent')}
          closeDialog={close}
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
