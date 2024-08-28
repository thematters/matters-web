import { DataProxy } from 'apollo-cache'
import { FetchResult } from '@apollo/client'

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
  cache: DataProxy
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
      variables: { id: collectionId },
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
        edges = [...addEdges, ...edges]
        data.node.articleList.totalCount += addEdges.length
        data.node.articles.totalCount += addEdges.length
        break
      case 'delete':
        edges = edges.filter(({ node }) => node.id !== articleId)
        data.node.articleList.totalCount -= 1
        data.node.articles.totalCount -= 1
        break
      case 'setTop':
      case 'setBottom':
        let targetEdge: (typeof edges)[0] | undefined = undefined
        edges = edges.filter((edge) => {
          const node = edge.node
          if (node.id === articleId) {
            targetEdge = edge
          }
          return node.id !== articleId
        })
        if (!targetEdge) {
          return
        }
        if (type === 'setTop') {
          edges.unshift(targetEdge)
        }

        if (type === 'setBottom') {
          edges.push(targetEdge)
        }
        break
    }

    cache.writeQuery({
      query: COLLECTION_DETAIL,
      variables: { id: collectionId },
      data: {
        ...data,
        node: {
          ...data.node,
          articleList: {
            ...data.node.articleList,
            edges,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
