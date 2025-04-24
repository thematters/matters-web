import { ApolloCache } from '@apollo/client/cache'

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
  cache: ApolloCache<any>
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

        const newEdge = {
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
        }

        const newEdges = [newEdge, ...edges]

        cache.writeQuery({
          query: ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
          variables: { userName, id: articleId },
          data: {
            ...data,
            user: {
              ...data.user,
              collections: {
                ...data.user.collections,
                edges: newEdges,
              },
            },
          },
        })
        return
    }
  } catch (e) {
    console.error(e)
  }
}
