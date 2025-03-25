import { ApolloCache } from '@apollo/client/cache'

import { COMMENTS_COUNT } from '~/common/enums'
import {
  LatestCommentsPrivateQuery,
  LatestCommentsPublicQuery,
} from '~/gql/graphql'

type CommentPublic = NonNullable<
  NonNullable<
    LatestCommentsPublicQuery['article'] & { __typename: 'Article' }
  >['comments']['edges']
>[0]['node']
type CommentPrivate = NonNullable<
  NonNullable<LatestCommentsPrivateQuery['nodes']>[0] & {
    __typename: 'Comment'
  }
>
type Comment = CommentPublic & Partial<Omit<CommentPrivate, '__typename'>>

export const updateArticleComments = ({
  cache,
  commentId,
  articleId,
  comment,
  type,
}: {
  cache: ApolloCache<any>
  articleId: string
  commentId?: string
  comment?: Comment
  type: 'pin' | 'unpin' | 'delete' | 'add' | 'addSecondaryComment'
}) => {
  // FIXME: circular dependencies
  const {
    LATEST_COMMENTS_PUBLIC,
  } = require('~/views/ArticleDetail/Comments/LatestComments/gql.ts')

  try {
    const data = cache.readQuery<LatestCommentsPublicQuery>({
      query: LATEST_COMMENTS_PUBLIC,
      variables: { id: articleId, first: COMMENTS_COUNT },
    })

    if (data?.article?.__typename !== 'Article') {
      return
    }

    if (!data?.article?.comments.edges) {
      return
    }

    // Create immutable copies of the data
    let updatedEdges = [...data.article.comments.edges]
    let updatedPinnedComments = data.article.pinnedComments
      ? [...data.article.pinnedComments]
      : []

    switch (type) {
      case 'pin':
        if (!commentId) {
          return
        }
        updatedEdges = updatedEdges.map((edge) => {
          if (edge.node.id === commentId) {
            // Create a new node with pinned set to true
            const updatedNode = {
              ...edge.node,
              pinned: true,
            }

            // Create a new edge with the updated node
            return {
              ...edge,
              node: updatedNode,
            }
          }
          return edge
        })

        // Find the comment that was pinned
        const pinnedComment = updatedEdges.find(
          (edge) => edge.node.id === commentId
        )?.node
        if (pinnedComment) {
          updatedPinnedComments = [pinnedComment]
        }
        break

      case 'unpin':
        // unpin all comments
        updatedEdges = updatedEdges.map((edge) => {
          // Create a new node with pinned set to false
          const updatedNode = {
            ...edge.node,
            pinned: false,
          }

          // Create a new edge with the updated node
          return {
            ...edge,
            node: updatedNode,
          }
        })
        updatedPinnedComments = []
        break

      case 'delete':
        if (!commentId) {
          return
        }
        updatedEdges = updatedEdges.filter(({ node }) => node.id !== commentId)
        if (
          updatedPinnedComments.length > 0 &&
          commentId === updatedPinnedComments[0].id
        ) {
          updatedPinnedComments = []
        }
        break

      case 'add':
        if (!comment) {
          return
        }
        updatedEdges = [
          { __typename: 'CommentEdge' as const, node: comment },
          ...updatedEdges,
        ]
        break

      case 'addSecondaryComment':
        if (!comment || !commentId) {
          return
        }
        if (comment.__typename !== 'Comment') {
          return
        }

        updatedEdges = updatedEdges.map((edge) => {
          if (edge.node.id === commentId) {
            // Create a new array of secondary comment edges
            const updatedSecondaryEdges = [
              ...(edge.node.comments.edges || []),
              {
                __typename: 'CommentEdge' as const,
                node: comment,
                cursor: crypto.randomUUID(),
              },
            ]

            // Create a new comments object with the updated edges
            const updatedComments = {
              ...edge.node.comments,
              edges: updatedSecondaryEdges,
            }

            // Create a new node with the updated comments
            const updatedNode = {
              ...edge.node,
              comments: updatedComments,
            }

            // Create a new edge with the updated node
            return {
              ...edge,
              node: updatedNode,
            }
          }
          return edge
        })

        // Update pinned comment if needed
        if (
          updatedPinnedComments.length > 0 &&
          updatedPinnedComments[0].id === commentId
        ) {
          const currentPinnedComment = updatedPinnedComments[0]

          // Create a new array of secondary comment edges for the pinned comment
          const updatedPinnedSecondaryEdges = [
            ...(currentPinnedComment.comments.edges || []),
            {
              __typename: 'CommentEdge' as const,
              node: comment,
              cursor: crypto.randomUUID(),
            },
          ]

          // Create a new comments object with the updated edges
          const updatedPinnedCommentsObj = {
            ...currentPinnedComment.comments,
            edges: updatedPinnedSecondaryEdges,
          }

          // Create a new pinned comment with the updated comments
          const updatedPinnedComment = {
            ...currentPinnedComment,
            comments: updatedPinnedCommentsObj,
          }

          // Update the pinned comments array
          updatedPinnedComments = [updatedPinnedComment]
        }
        break
    }

    cache.writeQuery({
      query: LATEST_COMMENTS_PUBLIC,
      variables: { id: articleId, first: COMMENTS_COUNT },
      data: {
        ...data,
        article: {
          ...data.article,
          pinnedComments: updatedPinnedComments,
          comments: {
            ...data.article.comments,
            edges: updatedEdges,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
