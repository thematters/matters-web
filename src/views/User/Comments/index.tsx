import { Layout, UserProfile } from '~/components'

import UserComments from './UserComments'

export default () => (
  <Layout.Main>
    <UserProfile />
    <UserComments />
  </Layout.Main>
)
