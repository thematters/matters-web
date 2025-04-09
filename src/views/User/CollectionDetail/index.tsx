import { useQuery } from '@apollo/client'

import {
  MAX_COLLECTION_ARTICLES_COUNT,
  MAX_META_SUMMARY_LENGTH,
} from '~/common/enums'
import { makeSummary, toPath } from '~/common/utils'
import { Head, Layout } from '~/components'
import { QueryError, Throw404, useRoute } from '~/components'
import { CollectionDetailQuery } from '~/gql/graphql'

import AsideUserProfile from '../UserProfile/AsideUserProfile'
import CollectionArticles from './CollectionArticles'
import CollectionArticlesPlaceholder from './CollectionArticles/Placeholder'
import CollectionProfile from './CollectionProfile'
import CollectionProfilePlaceholder from './CollectionProfile/Placeholder'
import { COLLECTION_DETAIL } from './gql'

const BaseCollectionDetail = () => {
  const { getQuery } = useRoute()
  const collectionId = getQuery('collectionId')

  /**
   * Data Fetching
   */
  const { data, loading, error } = useQuery<CollectionDetailQuery>(
    COLLECTION_DETAIL,
    {
      variables: { id: collectionId, first: MAX_COLLECTION_ARTICLES_COUNT },
    }
  )
  const collection = data?.node!

  /**
   * Render
   */
  if (loading) {
    return (
      <>
        <CollectionProfilePlaceholder />
        <CollectionArticlesPlaceholder />
      </>
    )
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!collection || collection.__typename !== 'Collection') {
    return <Throw404 />
  }

  return (
    <>
      <Head
        title={`${makeSummary(collection.title, MAX_META_SUMMARY_LENGTH)} - ${collection.author.displayName}`}
        path={
          toPath({
            page: 'collectionDetail',
            collection,
            userName: collection.author.userName!,
          }).href
        }
        description={collection.description || ''}
        image={collection.cover}
      />

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
