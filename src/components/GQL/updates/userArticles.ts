import { DataProxy } from 'apollo-cache'

import { UserArticlesPublicQuery } from '~/gql/graphql'
import { UserCollectionsQuery } from '~/gql/graphql'

export const updateUserArticles = ({
  cache,
  targetId,
  userName,
  type,
}: {
  cache: DataProxy
  targetId?: string
  userName: string
  type: 'pin' | 'unpin' | 'archive'
}) => {
  // FIXME: circular dependencies
  const { USER_ARTICLES_PUBLIC } = require('~/views/User/Articles/gql')
  const { USER_COLLECTIONS } = require('~/views/User/Collections/gql')

  let articlesData: UserArticlesPublicQuery | null = null
  try {
    articlesData = cache.readQuery<UserArticlesPublicQuery>({
      query: USER_ARTICLES_PUBLIC,
      variables: { userName },
    })
  } catch (e) {
    //
  }

  let collectionsData: UserCollectionsQuery | null = null
  try {
    collectionsData = cache.readQuery<UserCollectionsQuery>({
      query: USER_COLLECTIONS,
      variables: { userName },
    })
  } catch (e) {
    //
  }

  const articleEdges = articlesData?.user?.articles?.edges || []
  const collectionEdges = collectionsData?.user?.collections?.edges || []
  const articles = articleEdges.map((e) => e.node)
  const collecetions = collectionEdges.map((e) => e.node)

  const target = (articles.find((a) => a.id === targetId) ||
    collecetions.find((a) => a.id === targetId))!
  let pinnedWorks = articlesData?.user?.pinnedWorks || []

  switch (type) {
    case 'pin':
      pinnedWorks = [...pinnedWorks, target]
      break
    case 'unpin':
      pinnedWorks = pinnedWorks.filter((a) => a.id !== targetId)
      break
    case 'archive':
      // remove pinned article if it's archived
      pinnedWorks = pinnedWorks.filter((a) => a.id !== targetId)

      break
  }

  if (articlesData) {
    cache.writeQuery({
      query: USER_ARTICLES_PUBLIC,
      variables: { userName },
      data: {
        ...articlesData,
        user: {
          ...articlesData?.user,
          pinnedWorks,
        },
      },
    })
  }

  if (collectionsData) {
    cache.writeQuery({
      query: USER_COLLECTIONS,
      variables: { userName },
      data: {
        ...collectionsData,
      },
    })
  }
}
