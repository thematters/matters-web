import { DataProxy } from '@apollo/client/cache'

import { UserCollectionsQuery } from '~/gql/graphql'

export const updateUserCollections = ({
  cache,
  userName,
  collectionIds,
  type,
}: {
  cache: DataProxy
  userName: string
  collectionIds: string[]
  type: 'delete'
}) => {
  // FIXME: circular dependencies
  const { USER_COLLECTIONS } = require('~/views/User/Collections/gql')

  let collectionsData: UserCollectionsQuery | null = null
  try {
    collectionsData = cache.readQuery<UserCollectionsQuery>({
      query: USER_COLLECTIONS,
      variables: { userName },
    })
  } catch (e) {
    // console.error(e)
  }

  let collectionEdges = collectionsData?.user?.collections?.edges || []

  switch (type) {
    case 'delete':
      collectionEdges = collectionEdges.filter(
        ({ node }) => node.id !== collectionIds[0]
      )
      break
  }

  if (collectionsData) {
    cache.writeQuery({
      query: USER_COLLECTIONS,
      variables: { userName },
      data: {
        ...collectionsData,
        user: {
          ...collectionsData?.user,
          collections: {
            ...collectionsData?.user?.collections,
            edges: collectionEdges,
          },
        },
      },
    })
  }
}
