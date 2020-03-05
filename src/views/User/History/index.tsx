import { Head, Layout, UserProfile } from '~/components'

import UserTabs from '../UserTabs'
import MeHistory from './MeHistory'

export default () => (
  <Layout>
    <Head title={{ id: 'readHistory' }} />

    <UserProfile />
    <UserTabs />
    <MeHistory />
  </Layout>
)
