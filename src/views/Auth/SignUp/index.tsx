import { useRouter } from 'next/router'

import {
  Head,
  Layout,
  ReCaptchaProvider,
  SignUpForm,
  useStep,
} from '~/components'

import { getQuery } from '~/common/utils'

type Step = 'init' | 'verification_sent' | 'password' | 'complete'

const SignUp = () => {
  const router = useRouter()
  const email = getQuery({ router, key: 'email' })
  const code = getQuery({ router, key: 'code' })
  const displayName = getQuery({ router, key: 'displayName' })

  const initStep = email && code && displayName ? 'password' : 'init'
  const { currStep, forward } = useStep<Step>(initStep)

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'register' }} />

      {currStep === 'init' && (
        <ReCaptchaProvider>
          <SignUpForm.Init
            purpose="page"
            submitCallback={() => {
              forward('init')
            }}
          />
        </ReCaptchaProvider>
      )}

      {currStep === 'verification_sent' && (
        <SignUpForm.VerificationLinkSent purpose="page" />
      )}

      {currStep === 'password' && (
        <SignUpForm.Password
          email={email}
          code={code}
          displayName={displayName}
          purpose="page"
          submitCallback={() => {
            forward('complete')
          }}
        />
      )}

      {currStep === 'complete' && <SignUpForm.Complete purpose="page" />}
    </Layout.Main>
  )
}

export default SignUp
