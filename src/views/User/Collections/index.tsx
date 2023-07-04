import { Layout, UserProfile } from '~/components'
import AsideUserProfile from '~/components/UserProfile/AsideUserProfile'

import BaseUserCollections from './UserCollections'

const UserCollections = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <UserProfile />
    <BaseUserCollections />
  </Layout.Main>
)

export default UserCollections
