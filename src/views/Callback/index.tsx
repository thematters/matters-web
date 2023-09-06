import { useRouter } from 'next/router'

import { SocialAccountType } from '~/gql/graphql'

import SocialCallback from './SocialCallback'

const Callback = () => {
  const router = useRouter()
  const provider = router.query.provider
  return (
    <>
      {provider === 'google' && (
        <SocialCallback type={SocialAccountType.Google} />
      )}
      {provider === 'twitter' && (
        <SocialCallback type={SocialAccountType.Twitter} />
      )}
      {provider === 'facebook' && (
        <SocialCallback type={SocialAccountType.Facebook} />
      )}
    </>
  )
}

export default Callback
