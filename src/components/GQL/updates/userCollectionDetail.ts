import { DataProxy } from 'apollo-cache'

import { CollectionDetailQuery } from '~/gql/graphql'

const update = ({
  cache,
  collectionId,
  articleId,
  oldPosition,
  newPosition,
  type,
}: {
  cache: DataProxy
  collectionId: string
  articleId?: string
  oldPosition?: number
  newPosition?: number
  type: 'delete' | 'setTop' | 'setBottom' | 'reorder'
}) => {
  // FIXME: circular dependencies
  const {
    COLLECTION_DETAIL,
  } = require('~/views/User/CollectionDetail/CollectionProfile/gql')

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

    if (!data?.node?.articles.edges) {
      return
    }

    let edges = data.node.articles.edges

    switch (type) {
      case 'delete':
        edges = edges.filter(({ node }) => node.id !== articleId)
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
      case 'reorder':
        if (oldPosition === undefined || newPosition === undefined) {
          return
        }
        const [item] = edges.splice(oldPosition, 1)
        edges.splice(newPosition, 0, item)
        break
    }

    cache.writeQuery({
      query: COLLECTION_DETAIL,
      variables: { id: collectionId },
      data: {
        ...data,
        node: {
          ...data.node,
          articles: {
            ...data.node.articles,
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
