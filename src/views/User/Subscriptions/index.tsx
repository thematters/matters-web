import { Layout, UserProfile } from '~/components'

import BaseUserSubscriptions from './UserSubscriptions'

const UserSubscriptions = () => (
  <Layout.Main>
    <UserProfile />
    <BaseUserSubscriptions />
  </Layout.Main>
)

export default UserSubscriptions
