import { Layout, UserProfile } from '~/components'

import UserTabs from '../UserTabs'
import UserComments from './UserComments'

export default () => (
  <Layout>
    <UserProfile />
    <UserTabs />
    <UserComments />
  </Layout>
)
