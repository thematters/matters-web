import { Layout } from '~/components'
import AsideUserProfile from '~/components/UserProfile/AsideUserProfile'

const CollectionDetail = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <span>Collection Detail</span>
  </Layout.Main>
)

export default CollectionDetail
