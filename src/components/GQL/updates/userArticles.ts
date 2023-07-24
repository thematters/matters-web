import { DataProxy } from 'apollo-cache'

import { UserArticlesPublicQuery } from '~/gql/graphql'
import { UserCollectionsQuery } from '~/gql/graphql'

const update = ({
  cache,
  targetId,
  userName,
  type,
}: {
  cache: DataProxy
  targetId?: string
  userName?: string | null
  type: 'pin' | 'unpin' | 'archive' | 'addCollection' | 'deleteCollection'
}) => {
  // FIXME: circular dependencies
  const { USER_ARTICLES_PUBLIC } = require('~/views/User/Articles/gql')
  const { USER_COLLECTIONS } = require('~/views/User/Collections/gql')

  if (!userName) {
    return
  }

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

  if (type === 'addCollection' || type === 'deleteCollection') {
    switch (type) {
      case 'addCollection':
        if (articlesData && articlesData.user) {
          articlesData.user.tabsCollections.totalCount += 1
        }

        if (collectionsData && collectionsData.user) {
          collectionsData.user.tabsCollections.totalCount += 1
        }
        break
      case 'deleteCollection':
        if (articlesData && articlesData.user) {
          articlesData.user.tabsCollections.totalCount -= 1
        }
        if (collectionsData && collectionsData.user) {
          collectionsData.user.tabsCollections.totalCount -= 1
        }
        break
    }
    cache.writeQuery({
      query: USER_ARTICLES_PUBLIC,
      variables: { userName },
      data: {
        ...articlesData,
      },
    })
    cache.writeQuery({
      query: USER_COLLECTIONS,
      variables: { userName },
      data: {
        ...collectionsData,
      },
    })
    return
  }

  if (!targetId) {
    return
  }

  const articleEdges = articlesData?.user?.articles?.edges || []
  const collectionEdges = collectionsData?.user?.collections?.edges || []
  const articles = articleEdges.map((e) => e.node)
  const collecetions = collectionEdges.map((e) => e.node)

  const target = (articles.find((a) => a.id === targetId) ||
    collecetions.find((a) => a.id === targetId))!

  let pinnedWorks = articlesData?.user?.pinnedWorks || []
  let articleCount = articlesData?.user?.status?.articleCount

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

      if (articleCount) {
        articleCount -= 1
      }
      break
  }

  cache.writeQuery({
    query: USER_ARTICLES_PUBLIC,
    variables: { userName },
    data: {
      user: {
        ...articlesData?.user,
        pinnedWorks,
        status: {
          ...articlesData?.user?.status,
          articleCount,
        },
      },
    },
  })
}

export default update
