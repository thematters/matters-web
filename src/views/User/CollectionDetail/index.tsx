import { Layout } from '~/components'
import AsideUserProfile from '~/components/UserProfile/AsideUserProfile'

import CollectionProfile from './CollectionProfile'

const CollectionDetail = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <CollectionProfile />
  </Layout.Main>
)

export default CollectionDetail
