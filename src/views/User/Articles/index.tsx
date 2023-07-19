import { Layout, UserProfile } from '~/components'
import AsideUserProfile from '~/components/UserProfile/AsideUserProfile'

import BaseUserArticles from './UserArticles'

const UserArticles = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <UserProfile />
    <BaseUserArticles />
  </Layout.Main>
)

export default UserArticles
