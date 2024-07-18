import { DataProxy } from 'apollo-cache'

import { MomentDetailQuery } from '~/gql/graphql'

type Comment = NonNullable<
  NonNullable<
    MomentDetailQuery['node'] & { __typename: 'Moment' }
  >['comments']['edges']
>[0]['node']

export const updateMomentDetail = ({
  cache,
  momentId,
  comment,
  type,
}: {
  cache: DataProxy
  momentId: string
  comment?: Comment
  type: 'addComment'
}) => {
  // FIXME: circular dependencies
  const {
    MOMENT_DETAIL,
  } = require('~/components/Dialogs/MomentDetailDialog/gql.ts')

  try {
    const data = cache.readQuery<MomentDetailQuery>({
      query: MOMENT_DETAIL,
      variables: { id: momentId },
    })

    if (!data || data?.node?.__typename !== 'Moment') {
      return
    }

    if (!data?.node?.comments.edges) {
      return
    }

    let edges = data.node.comments.edges

    switch (type) {
      case 'addComment':
        if (!edges || !comment) {
          return
        }
        edges.push({
          cursor: comment.id,
          node: comment,
          __typename: 'CommentEdge',
        })
        break
    }

    cache.writeQuery({
      query: MOMENT_DETAIL,
      variables: { id: momentId },
      data: {
        node: {
          ...data.node,
          comments: {
            ...data.node.comments,
            edges,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
