import { SocialAccountType } from '~/gql/graphql'

import SocialCallback from './SocialCallback'

const GoogleCallback = () => {
  return <SocialCallback type={SocialAccountType.Google} />
}

export default GoogleCallback
