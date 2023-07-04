import { DataProxy } from 'apollo-cache'

import { UserCollectionsQuery } from '~/gql/graphql'

const update = ({
  cache,
  collectionId,
  userName,
  type,
}: {
  cache: DataProxy
  collectionId: string
  userName?: string | null
  type: 'delete'
}) => {
  // FIXME: circular dependencies
  const { USER_COLLECTIONS } = require('~/views/User/Collections/gql')

  if (!userName) {
    return
  }

  try {
    const data = cache.readQuery<UserCollectionsQuery>({
      query: USER_COLLECTIONS,
      variables: { userName },
    })

    if (!data?.user?.collections.edges) {
      return
    }

    let edges = data.user.collections.edges

    switch (type) {
      case 'delete':
        edges = edges.filter(({ node }) => node.id !== collectionId)
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
  } catch (e) {
    console.error(e)
  }
}

export default update
