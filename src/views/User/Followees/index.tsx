import { Layout, UserProfile } from '~/components'

import BaseUserFollowees from './UserFollowees'

const UserFollowees = () => (
  <Layout.Main>
    <UserProfile />
    <BaseUserFollowees />
  </Layout.Main>
)

export default UserFollowees
