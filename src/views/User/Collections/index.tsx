import { Layout } from '~/components'
import AsideUserProfile from '~/components/UserProfile/AsideUserProfile'

const UserCollections = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <span>User Collections</span>
  </Layout.Main>
)

export default UserCollections
