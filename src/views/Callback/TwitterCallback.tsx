import { SocialAccountType } from '~/gql/graphql'

import SocialCallback from './SocialCallback'

const TwitterCallback = () => {
  return <SocialCallback type={SocialAccountType.Twitter} />
}

export default TwitterCallback
