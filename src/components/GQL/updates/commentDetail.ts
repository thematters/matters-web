import { DataProxy } from '@apollo/client/cache'

import { CommentDetailQuery } from '~/gql/graphql'

type Comment = NonNullable<
  NonNullable<
    CommentDetailQuery['node'] & { __typename: 'Comment' }
  >['comments']['edges']
>[0]['node']

export const updateCommentDetail = ({
  cache,
  commentId,
  comment,
  type,
}: {
  cache: DataProxy
  commentId: string
  comment?: Comment
  type: 'add'
}) => {
  // FIXME: circular dependencies
  const {
    COMMENT_DETAIL,
  } = require('~/views/ArticleDetail/Comments/CommentDetail/gql.ts')

  try {
    const data = cache.readQuery<CommentDetailQuery>({
      query: COMMENT_DETAIL,
      variables: { id: commentId },
    })

    if (!data || data?.node?.__typename !== 'Comment') {
      return
    }

    if (!data?.node?.comments.edges) {
      return
    }

    let edges = data.node.comments.edges

    switch (type) {
      case 'add':
        if (!edges || !comment) {
          return
        }
        edges.push({
          cursor: '',
          node: comment,
          __typename: 'CommentEdge',
        })
        break
    }

    cache.writeQuery({
      query: COMMENT_DETAIL,
      variables: { id: commentId },
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
