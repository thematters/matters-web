import { SocialAccountType } from '~/gql/graphql'

import SocialCallback from './SocialCallback'

const FacebookCallback = () => {
  return <SocialCallback type={SocialAccountType.Facebook} />
}

export default FacebookCallback
