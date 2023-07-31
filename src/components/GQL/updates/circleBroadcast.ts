import { DataProxy } from 'apollo-cache'

import { BroadcastPublicQuery } from '~/gql/graphql'

const sortEdgesByCreatedAtDesc = (
  edges: NonNullable<
    NonNullable<BroadcastPublicQuery['circle']>['broadcast']['edges']
  >
) => {
  return edges.sort(
    ({ node: n1 }, { node: n2 }) =>
      Date.parse(n2.createdAt) - Date.parse(n1.createdAt)
  )
}

export const updateCircleBroadcast = ({
  cache,
  commentId,
  name,
  type,
}: {
  cache: DataProxy
  commentId: string
  name: string | null
  type: 'pin' | 'unpin'
}) => {
  // FIXME: circular dependencies
  const { BROADCAST_PUBLIC } = require('~/views/Circle/Broadcast/gql')

  if (!name) {
    return
  }

  try {
    const data = cache.readQuery<BroadcastPublicQuery>({
      query: BROADCAST_PUBLIC,
      variables: { name },
    })

    if (!data?.circle?.broadcast.edges) {
      return
    }

    let edges = data.circle.broadcast.edges
    const targetEdge = edges.filter(({ node }) => node.id === commentId)[0]

    switch (type) {
      case 'pin':
        // unpin rest broadcast
        const restEdges = edges.filter(({ node }) => {
          if (node.id !== commentId) {
            node.pinned = false
            return true
          }
        })
        edges = [targetEdge, ...sortEdgesByCreatedAtDesc(restEdges)]
        break
      case 'unpin':
        // unpin all broadcast
        edges = edges.map((edge) => {
          edge.node.pinned = false
          return edge
        })
        edges = sortEdgesByCreatedAtDesc(edges)
        break
    }

    cache.writeQuery({
      query: BROADCAST_PUBLIC,
      variables: { name },
      data: {
        circle: {
          ...data.circle,
          broadcast: {
            ...data.circle.broadcast,
            edges,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
