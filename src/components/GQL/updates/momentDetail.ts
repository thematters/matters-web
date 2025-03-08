import { DataProxy } from '@apollo/client/cache'

import { MomentDetailQuery } from '~/gql/graphql'

type Comment = NonNullable<
  NonNullable<
    MomentDetailQuery['moment'] & { __typename: 'Moment' }
  >['comments']['edges']
>[0]['node']

export const updateMomentDetail = ({
  cache,
  shortHash,
  comment,
  type,
}: {
  cache: DataProxy
  shortHash: string
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
      variables: { shortHash },
    })

    if (!data || data?.moment?.__typename !== 'Moment') {
      return
    }

    if (!data?.moment?.comments.edges) {
      return
    }

    // Create a new immutable array of edges
    let updatedEdges = [...data.moment.comments.edges]

    switch (type) {
      case 'addComment':
        if (!updatedEdges || !comment) {
          return
        }
        // Add the new comment to the edges array
        updatedEdges = [
          ...updatedEdges,
          {
            cursor: comment.id,
            node: comment,
            __typename: 'CommentEdge' as const,
          },
        ]
        break
    }

    cache.writeQuery({
      query: MOMENT_DETAIL,
      variables: { shortHash },
      data: {
        ...data,
        moment: {
          ...data.moment,
          comments: {
            ...data.moment.comments,
            edges: updatedEdges,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
