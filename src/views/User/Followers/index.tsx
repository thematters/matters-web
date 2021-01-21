import { Layout, UserProfile } from '~/components'

import BaseUserFollowers from './UserFollowers'

const UserFollowers = () => (
  <Layout.Main>
    <UserProfile />
    <BaseUserFollowers />
  </Layout.Main>
)

export default UserFollowers
