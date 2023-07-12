import { Layout } from '~/components'
import { QueryError, Throw404, usePublicQuery, useRoute } from '~/components'
import AsideUserProfile from '~/components/UserProfile/AsideUserProfile'
import { CollectionDetailQuery } from '~/gql/graphql'

import CollectionArticles from './CollectionArticles'
import CollectionProfile from './CollectionProfile'
import CollectionProfilePlaceholder from './CollectionProfile/Placeholder'
import { COLLECTION_DETAIL } from './gql'

const BaseCollectionDetail = () => {
  const { getQuery } = useRoute()
  const collectionId = getQuery('collectionId')

  /**
   * Data Fetching
   */
  const { data, loading, error } = usePublicQuery<CollectionDetailQuery>(
    COLLECTION_DETAIL,
    {
      variables: { id: collectionId },
    }
  )
  const collection = data?.node!

  /**
   * Render
   */
  if (loading) {
    return <CollectionProfilePlaceholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!collection || collection.__typename !== 'Collection') {
    return <Throw404 />
  }

  return (
    <>
      <CollectionProfile collection={collection} />
      <CollectionArticles collection={collection} />
    </>
  )
}

const CollectionDetail = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <BaseCollectionDetail />
  </Layout.Main>
)

export default CollectionDetail
