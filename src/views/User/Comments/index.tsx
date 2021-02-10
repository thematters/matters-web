import { Layout, UserProfile } from '~/components'

import BaseUserComments from './UserComments'

const UserComments = () => (
  <Layout.Main>
    <UserProfile />
    <BaseUserComments />
  </Layout.Main>
)

export default UserComments
