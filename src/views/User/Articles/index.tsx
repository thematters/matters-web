import { Layout, UserProfile } from '~/components'

import UserTabs from '../UserTabs'
import UserArticles from './UserArticles'

export default () => (
  <Layout>
    <UserProfile />
    <UserTabs />
    <UserArticles />
  </Layout>
)
