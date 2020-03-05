import { Head, Layout, UserProfile } from '~/components'

import UserTabs from '../UserTabs'
import MeBookmarks from './MeBookmarks'

export default () => (
  <Layout>
    <Head title={{ id: 'bookmark' }} />

    <UserProfile />
    <UserTabs />
    <MeBookmarks />
  </Layout>
)
