import { DataProxy } from 'apollo-cache'

import {
  AddCollectionsArticleUserPublicQuery,
  CreateCollectionMutation,
} from '~/gql/graphql'

const update = ({
  cache,
  collectionIds,
  articleId,
  collection,
  userName,
  type,
}: {
  cache: DataProxy
  collectionIds?: string[]
  articleId: string
  collection?: CreateCollectionMutation['putCollection']
  userName?: string | null
  type: 'addCollection' | 'addArticles'
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

      case 'addArticles':
        if (!collectionIds || !articleId) {
          return
        }
        const newEdges: typeof edges = []
        edges.map((edge) => {
          const node = edge.node
          if (collectionIds.includes(node.id)) {
            node.articles.edges?.push({
              __typename: 'ArticleEdge',
              node: {
                __typename: 'Article',
                id: articleId,
              },
            })
            node.contains = true
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

export default update
