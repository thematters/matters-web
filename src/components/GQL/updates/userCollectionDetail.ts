import { FetchResult } from '@apollo/client'
import { ApolloCache } from '@apollo/client/cache'

import { MAX_COLLECTION_ARTICLES_COUNT } from '~/common/enums'
import {
  AddArticlesCollectionMutation,
  CollectionArticlesPublicQuery,
} from '~/gql/graphql'

export const updateUserCollectionDetail = ({
  cache,
  collectionId,
  result,
  articleId,
  type,
}: {
  cache: ApolloCache<object>
  collectionId: string
  result?: FetchResult<AddArticlesCollectionMutation>
  articleId?: string
  type: 'add' | 'delete' | 'setTop' | 'setBottom'
}) => {
  const {
    COLLECTION_ARTICLES_PUBLIC,
  } = require('~/views/User/CollectionDetail/CollectionArticles/gql')

  if (!collectionId) return

  try {
    const data = cache.readQuery<CollectionArticlesPublicQuery>({
      query: COLLECTION_ARTICLES_PUBLIC,
      variables: {
        id: collectionId,
        first: MAX_COLLECTION_ARTICLES_COUNT,
        reversed: true,
      },
    })

    if (
      data?.node?.__typename !== 'Collection' ||
      !data?.node?.articleList.edges
    ) {
      return
    }

    const edges = data.node.articleList.edges
    const baseArticleList = {
      ...data.node.articleList,
    }

    let updatedArticleList = null

    switch (type) {
      case 'add': {
        const addEdges =
          result?.data?.addCollectionsArticles[0].articles.edges || []
        const newEdges = [...addEdges, ...edges]
        const totalCount = data.node.articleList.totalCount + addEdges.length

        updatedArticleList = {
          ...baseArticleList,
          edges: newEdges,
          totalCount,
        }
        break
      }

      case 'delete': {
        const filteredEdges = edges.filter(({ node }) => node.id !== articleId)
        const totalCount = data.node.articleList.totalCount - 1

        updatedArticleList = {
          ...baseArticleList,
          edges: filteredEdges,
          totalCount,
        }
        break
      }

      case 'setTop':
      case 'setBottom': {
        const targetEdge = edges.find(({ node }) => node.id === articleId)
        if (!targetEdge) return

        const remainingEdges = edges.filter(({ node }) => node.id !== articleId)
        const reorderedEdges =
          type === 'setTop'
            ? [targetEdge, ...remainingEdges]
            : [...remainingEdges, targetEdge]

        updatedArticleList = {
          ...baseArticleList,
          edges: reorderedEdges,
        }
        break
      }
    }

    if (updatedArticleList) {
      cache.writeQuery({
        query: COLLECTION_ARTICLES_PUBLIC,
        variables: {
          id: collectionId,
          first: MAX_COLLECTION_ARTICLES_COUNT,
          reversed: true,
        },
        data: {
          ...data,
          node: {
            ...data.node,
            articleList: updatedArticleList,
          },
        },
      })
    }
  } catch (e) {
    console.error(e)
  }
}
