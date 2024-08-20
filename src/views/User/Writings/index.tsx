import { Layout } from '~/components'

import UserProfile from '../UserProfile'
import AsideUserProfile from '../UserProfile/AsideUserProfile'
import BaseUserWriting from './UserWritings'

const UserWritings = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <UserProfile />
    <BaseUserWriting />
  </Layout.Main>
)

export default UserWritings
