import { Layout, Head, UserProfile } from '~/components'

import UserTabs from '../UserTabs'
import MeDrafts from './MeDrafts'

export default () => (
  <Layout>
    <Head title={{ id: 'draft' }} />

    <UserProfile />
    <UserTabs />
    <MeDrafts />
  </Layout>
)
