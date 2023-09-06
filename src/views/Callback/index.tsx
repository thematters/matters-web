import { useRouter } from 'next/router'

import { OAUTH_CALLBACK_PROVIDERS } from '~/common/enums'
import { SocialAccountType } from '~/gql/graphql'

import EmailVerification from './EmailVerification'
import SocialCallback from './SocialCallback'

const Callback = () => {
  const router = useRouter()
  const provider = router.query.provider
  return (
    <>
      {provider === OAUTH_CALLBACK_PROVIDERS.Google && (
        <SocialCallback type={SocialAccountType.Google} />
      )}
      {provider === OAUTH_CALLBACK_PROVIDERS.Twitter && (
        <SocialCallback type={SocialAccountType.Twitter} />
      )}
      {provider === OAUTH_CALLBACK_PROVIDERS.Facebook && (
        <SocialCallback type={SocialAccountType.Facebook} />
      )}
      {provider === OAUTH_CALLBACK_PROVIDERS.EmailVerification && (
        <EmailVerification />
      )}
    </>
  )
}

export default Callback
