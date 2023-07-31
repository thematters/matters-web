import { Layout } from '~/components'

import UserProfile from '../UserProfile'
import AsideUserProfile from '../UserProfile/AsideUserProfile'
import BaseUserCollections from './UserCollections'

const UserCollections = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <UserProfile />
    <BaseUserCollections />
  </Layout.Main>
)

export default UserCollections
