import { Layout, UserProfile } from '~/components'

import BaseUserTags from './UserTags'

const UserTags = () => (
  <Layout.Main>
    <UserProfile />
    <BaseUserTags />
  </Layout.Main>
)

export default UserTags
