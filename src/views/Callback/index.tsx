import { useRouter } from 'next/router'

import { CALLBACK_PROVIDERS } from '~/common/enums'
import { SocialAccountType } from '~/gql/graphql'

import EmailVerification from './EmailVerification'
import LoginCallback from './LoginCallback'
import SocialCallback from './SocialCallback'

const Callback = () => {
  const router = useRouter()
  const provider = router.query.provider
  return (
    <>
      {provider === CALLBACK_PROVIDERS.Google && (
        <SocialCallback type={SocialAccountType.Google} />
      )}
      {provider === CALLBACK_PROVIDERS.Twitter && (
        <SocialCallback type={SocialAccountType.Twitter} />
      )}
      {provider === CALLBACK_PROVIDERS.EmailVerification && (
        <EmailVerification />
      )}
      {(provider === CALLBACK_PROVIDERS.EmailSignup ||
        provider === CALLBACK_PROVIDERS.EmailSignin) && <LoginCallback />}
    </>
  )
}

export default Callback
