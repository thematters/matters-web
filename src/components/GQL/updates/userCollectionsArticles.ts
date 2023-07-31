import { DataProxy } from 'apollo-cache'

import {
  AddCollectionsArticleUserPublicQuery,
  CreateCollectionMutation,
} from '~/gql/graphql'

export const updateUserCollectionsArticles = ({
  cache,
  articleId,
  collection,
  userName,
  type,
}: {
  cache: DataProxy
  articleId: string
  collection?: CreateCollectionMutation['putCollection']
  userName?: string | null
  type: 'addCollection'
}) => {
  // FIXME: circular dependencies
  const {
    ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
  } = require('~/components/Dialogs/AddCollectionsArticleDialog/gql')

  if (!userName || !articleId) {
    return
  }

  try {
    const data = cache.readQuery<AddCollectionsArticleUserPublicQuery>({
      query: ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
      variables: { userName, id: articleId },
    })

    if (!data?.user?.collections.edges) {
      return
    }

    let edges = data.user.collections.edges

    switch (type) {
      case 'addCollection':
        if (!collection) {
          return
        }
        edges.unshift({
          __typename: 'CollectionEdge',
          node: {
            ...collection,
            articles: {
              __typename: 'ArticleConnection',
              totalCount: 0,
              edges: [],
            },
            contains: false,
          },
        })
        break
    }

    cache.writeQuery({
      query: ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
      variables: { userName, id: articleId },
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
