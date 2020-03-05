import { Layout, UserProfile } from '~/components'

import FollowerTabs from '../FollowerTabs'
import UserFollowees from './UserFollowees'

export default () => (
  <Layout>
    <UserProfile />
    <FollowerTabs />
    <UserFollowees />
  </Layout>
)
