import {
  ChangePasswordForm,
  Head,
  Layout,
  useRoute,
  useStep,
  VerificationLinkSent,
} from '~/components'

type Step = 'request' | 'verification_sent' | 'confirm' | 'complete'

const Forget = () => {
  const { getQuery } = useRoute()
  const email = getQuery('email')
  const code = getQuery('code')

  const initStep = code ? 'confirm' : 'request'
  const { currStep, forward } = useStep<Step>(initStep)

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'forgetPassword' }} />

      {currStep === 'request' && (
        <ChangePasswordForm.Request
          type="forget"
          purpose="page"
          submitCallback={() => forward('verification_sent')}
        />
      )}

      {currStep === 'verification_sent' && (
        <VerificationLinkSent type="resetPassword" purpose="page" />
      )}

      {currStep === 'confirm' && (
        <ChangePasswordForm.Confirm
          email={email}
          code={code}
          type="forget"
          purpose="page"
          submitCallback={() => forward('complete')}
        />
      )}

      {currStep === 'complete' && (
        <ChangePasswordForm.Complete type="forget" purpose="page" />
      )}
    </Layout.Main>
  )
}

export default Forget
