import { Layout } from '~/components'

import UserProfile from '../UserProfile'
import AsideUserProfile from '../UserProfile/AsideUserProfile'
import BaseUserArticles from './UserArticles'

const UserArticles = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <UserProfile />
    <BaseUserArticles />
  </Layout.Main>
)

export default UserArticles
