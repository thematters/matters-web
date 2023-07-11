import { Layout } from '~/components'
import AsideUserProfile from '~/components/UserProfile/AsideUserProfile'

import BaseCollectionDetail from './Content'

const CollectionDetail = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <BaseCollectionDetail />
  </Layout.Main>
)

export default CollectionDetail
