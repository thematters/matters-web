import { Layout, UserProfile } from '~/components'

import FollowerTabs from '../FollowerTabs'
import UserFollowers from './UserFollowers'

export default () => (
  <Layout>
    <UserProfile />
    <FollowerTabs />
    <UserFollowers />
  </Layout>
)
