import { DataProxy } from 'apollo-cache'

import {
  AddCollectionsArticleUserPublicQuery,
  CreateCollectionMutation,
} from '~/gql/graphql'

const update = ({
  cache,
  collectionIds,
  articleIds,
  collection,
  userName,
  type,
}: {
  cache: DataProxy
  collectionIds?: string[]
  articleIds?: string[]
  collection?: CreateCollectionMutation['putCollection']
  userName?: string | null
  type: 'addConnection' | 'addArticles'
}) => {
  // FIXME: circular dependencies
  const {
    ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
  } = require('~/components/Dialogs/AddCollectionsArticleDialog/gql')

  if (!userName) {
    return
  }

  try {
    const data = cache.readQuery<AddCollectionsArticleUserPublicQuery>({
      query: ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
      variables: { userName },
    })

    if (!data?.user?.collections.edges) {
      return
    }

    let edges = data.user.collections.edges

    switch (type) {
      case 'addConnection':
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
          },
        })
        break

      case 'addArticles':
        if (!collectionIds || !articleIds) {
          return
        }
        const newEdges: typeof edges = []
        edges.map((edge) => {
          const node = edge.node
          if (collectionIds.includes(node.id)) {
            articleIds.map((articleId) => {
              node.articles.edges?.push({
                __typename: 'ArticleEdge',
                node: {
                  __typename: 'Article',
                  id: articleId,
                },
              })
            })
            newEdges.unshift(edge)
          } else {
            newEdges.push(edge)
          }
        })
        edges = newEdges
        break
    }

    cache.writeQuery({
      query: ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
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
