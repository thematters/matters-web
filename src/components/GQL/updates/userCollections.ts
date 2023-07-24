import { DataProxy } from 'apollo-cache'

import {
  CollectionDigestFeedCollectionFragment,
  UserCollectionsQuery,
} from '~/gql/graphql'

const update = ({
  cache,
  userName,
  collectionIds,
  type,
}: {
  cache: DataProxy
  userName?: string | null
  collection?: CollectionDigestFeedCollectionFragment
  collectionIds?: string[]
  type: 'delete'
}) => {
  // FIXME: circular dependencies
  const { USER_COLLECTIONS } = require('~/views/User/Collections/gql')

  if (!userName) {
    return
  }
  let data: UserCollectionsQuery | null = null
  try {
    data = cache.readQuery<UserCollectionsQuery>({
      query: USER_COLLECTIONS,
      variables: { userName },
    })
  } catch (e) {
    // console.error(e)
  }

  if (!data) {
    return
  }

  if (!data?.user?.collections.edges) {
    return
  }

  let edges = data.user.collections.edges

  switch (type) {
    case 'delete':
      if (!collectionIds) {
        return
      }
      data.user.tabsCollections.totalCount -= 1
      data.user.collections.totalCount -= 1
      edges = edges.filter(({ node }) => node.id !== collectionIds[0])
      break
  }

  cache.writeQuery({
    query: USER_COLLECTIONS,
    variables: { userName },
    data: {
      ...data,
      user: {
        ...data.user,
        collections: {
          ...data.user.collections,
          edges,
        },
      },
    },
  })
}

export default update
