import { FetchResult } from '@apollo/client'
import { ApolloCache } from '@apollo/client/cache'

import { MAX_COLLECTION_ARTICLES_COUNT } from '~/common/enums'
import {
  AddArticlesCollectionMutation,
  CollectionDetailQuery,
} from '~/gql/graphql'

export const updateUserCollectionDetail = ({
  cache,
  collectionId,
  result,
  articleId,

  type,
}: {
  cache: ApolloCache<any>
  collectionId: string
  result?: FetchResult<AddArticlesCollectionMutation>
  articleId?: string

  type: 'add' | 'delete' | 'setTop' | 'setBottom'
}) => {
  // FIXME: circular dependencies
  const { COLLECTION_DETAIL } = require('~/views/User/CollectionDetail/gql')

  if (!collectionId) {
    return
  }

  try {
    const data = cache.readQuery<CollectionDetailQuery>({
      query: COLLECTION_DETAIL,
      variables: { id: collectionId, first: MAX_COLLECTION_ARTICLES_COUNT },
    })

    if (data?.node?.__typename !== 'Collection') {
      return
    }

    if (!data?.node?.articleList.edges) {
      return
    }

    let edges = data.node.articleList.edges

    switch (type) {
      case 'add':
        const addEdges =
          result?.data?.addCollectionsArticles[0].articles.edges || []
        const newEdges = [...addEdges, ...edges]

        cache.writeQuery({
          query: COLLECTION_DETAIL,
          variables: { id: collectionId, first: MAX_COLLECTION_ARTICLES_COUNT },
          data: {
            ...data,
            node: {
              ...data.node,
              articleList: {
                ...data.node.articleList,
                edges: newEdges,
                totalCount: data.node.articleList.totalCount + addEdges.length,
              },
              articles: {
                ...data.node.articles,
                totalCount: data.node.articles.totalCount + addEdges.length,
              },
            },
          },
        })
        return
      case 'delete':
        const filteredEdges = edges.filter(({ node }) => node.id !== articleId)

        cache.writeQuery({
          query: COLLECTION_DETAIL,
          variables: { id: collectionId, first: MAX_COLLECTION_ARTICLES_COUNT },
          data: {
            ...data,
            node: {
              ...data.node,
              articleList: {
                ...data.node.articleList,
                edges: filteredEdges,
                totalCount: data.node.articleList.totalCount - 1,
              },
              articles: {
                ...data.node.articles,
                totalCount: data.node.articles.totalCount - 1,
              },
            },
          },
        })
        return
      case 'setTop':
      case 'setBottom':
        let targetEdge: (typeof edges)[0] | undefined = undefined
        const remainingEdges = edges.filter((edge) => {
          const node = edge.node
          if (node.id === articleId) {
            targetEdge = edge
          }
          return node.id !== articleId
        })

        if (!targetEdge) {
          return
        }

        const reorderedEdges =
          type === 'setTop'
            ? [targetEdge, ...remainingEdges]
            : [...remainingEdges, targetEdge]

        cache.writeQuery({
          query: COLLECTION_DETAIL,
          variables: { id: collectionId, first: MAX_COLLECTION_ARTICLES_COUNT },
          data: {
            ...data,
            node: {
              ...data.node,
              articleList: {
                ...data.node.articleList,
                edges: reorderedEdges,
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
