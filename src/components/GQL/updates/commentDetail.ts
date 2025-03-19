import { ApolloCache } from '@apollo/client/cache'

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
  cache: ApolloCache<any>
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

    let newEdges = [...data.node.comments.edges]

    switch (type) {
      case 'add':
        if (!comment) {
          return
        }
        newEdges = [
          ...newEdges,
          {
            cursor: '',
            node: comment,
            __typename: 'CommentEdge',
          },
        ]
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
            edges: newEdges,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
