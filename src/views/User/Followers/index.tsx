import { Layout, UserProfile } from '~/components'

import UserFollowers from './UserFollowers'

export default () => (
  <Layout.Main>
    <UserProfile />
    <UserFollowers />
  </Layout.Main>
)
