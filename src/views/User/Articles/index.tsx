import { Layout, UserProfile } from '~/components'

import BaseUserArticles from './UserArticles'

const UserArticles = () => (
  <Layout.Main>
    <UserProfile />
    <BaseUserArticles />
  </Layout.Main>
)

export default UserArticles
