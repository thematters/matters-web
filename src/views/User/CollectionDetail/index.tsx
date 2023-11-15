import { useIntl } from 'react-intl'

import { toPath } from '~/common/utils'
import { Head, Layout } from '~/components'
import { QueryError, Throw404, usePublicQuery, useRoute } from '~/components'
import { CollectionDetailQuery } from '~/gql/graphql'

import AsideUserProfile from '../UserProfile/AsideUserProfile'
import CollectionArticles from './CollectionArticles'
import CollectinoArticlesPlaceholder from './CollectionArticles/Placeholder'
import CollectionProfile from './CollectionProfile'
import CollectionProfilePlaceholder from './CollectionProfile/Placeholder'
import { COLLECTION_DETAIL } from './gql'

const BaseCollectionDetail = () => {
  const { getQuery } = useRoute()
  const collectionId = getQuery('collectionId')

  const intl = useIntl()
  const prefix = intl.formatMessage({
    defaultMessage: 'Collections',
    id: 'ulh3kf',
  })

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
    return (
      <>
        <CollectionProfilePlaceholder />
        <CollectinoArticlesPlaceholder />
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
        title={`${prefix} - ${collection.title} - ${collection.author.displayName} (@${collection.author.userName})`}
        path={
          toPath({
            page: 'collectionDetail',
            collection,
            userName: collection.author.userName!,
          }).href
        }
        noSuffix
        description={collection.description}
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
