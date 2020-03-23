import { Layout, UserProfile } from '~/components'

import FollowerTabs from '../FollowerTabs'
import UserFollowers from './UserFollowers'

export default () => (
  <Layout.Main>
    <UserProfile />
    <FollowerTabs />
    <UserFollowers />
  </Layout.Main>
)
