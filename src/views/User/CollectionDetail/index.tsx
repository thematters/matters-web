import { useContext } from 'react'
import { useEffect } from 'react'

import { MAX_META_SUMMARY_LENGTH } from '~/common/enums'
import {
  // analytics,
  makeSummary,
  toPath,
} from '~/common/utils'
import { Head, Layout, usePublicQuery, ViewerContext } from '~/components'
import { QueryError, Throw404, useRoute } from '~/components'
import { CollectionDetailPublicQuery } from '~/gql/graphql'

import AsideUserProfile from '../UserProfile/AsideUserProfile'
import CollectionArticles from './CollectionArticles'
import CollectionProfile from './CollectionProfile'
import CollectionProfilePlaceholder from './CollectionProfile/Placeholder'
import { COLLECTION_DETAIL_PRIVATE, COLLECTION_DETAIL_PUBLIC } from './gql'

const BaseCollectionDetail = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const collectionId = getQuery('collectionId')

  /**
   * Data Fetching
   */
  const { data, loading, error, client } =
    usePublicQuery<CollectionDetailPublicQuery>(COLLECTION_DETAIL_PUBLIC, {
      variables: { id: collectionId },
    })
  const collection = data?.node

  // private data
  const loadPrivate = async () => {
    if (!viewer.isAuthed) {
      return
    }

    await client.query({
      query: COLLECTION_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { id: collectionId },
    })
  }

  // fetch private data
  useEffect(() => {
    if (!collection?.id) {
      return
    }

    if (viewer.isAuthed) {
      loadPrivate()
    }
  }, [collection?.id])

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
      <CollectionArticles />
    </>
  )
}

const CollectionDetail = () => (
  <Layout.Main aside={<AsideUserProfile />}>
    <BaseCollectionDetail />
  </Layout.Main>
)

export default CollectionDetail
