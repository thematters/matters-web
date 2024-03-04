import { DataProxy } from 'apollo-cache'

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
  cache: DataProxy
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

    let edges = data?.article.comments.edges
    let pinnedComments = data?.article.pinnedComments

    switch (type) {
      case 'pin':
        if (!commentId) {
          return
        }
        edges = edges.map((edge) => {
          if (edge.node.id === commentId) {
            edge.node.pinned = true

            pinnedComments = [edge.node]
          }
          return edge
        })
        break
      case 'unpin':
        // unpin all comments
        edges = edges.map((edge) => {
          edge.node.pinned = false
          return edge
        })
        pinnedComments = []
        break
      case 'delete':
        if (!commentId) {
          return
        }
        edges = edges.filter(({ node }) => node.id !== commentId)
        if (
          !!pinnedComments &&
          pinnedComments.length > 0 &&
          commentId === pinnedComments[0].id
        ) {
          pinnedComments = []
        }
        break
      case 'add':
        if (!comment) {
          return
        }
        edges = [{ __typename: 'CommentEdge', node: comment }, ...edges]
        break
      case 'addSecondaryComment':
        if (!comment && !commentId) {
          return
        }
        if (comment?.__typename !== 'Comment') {
          return
        }
        edges = edges.map((edge) => {
          if (edge.node.id === commentId) {
            edge.node.comments.edges?.push({
              __typename: 'CommentEdge',
              node: comment,
              cursor: crypto.randomUUID(),
            })
          }
          return edge
        })
        // update pinned comment
        if (
          pinnedComments &&
          pinnedComments.length > 0 &&
          pinnedComments[0].id === commentId
        ) {
          pinnedComments[0].comments.edges?.push({
            __typename: 'CommentEdge',
            node: comment,
            cursor: crypto.randomUUID(),
          })
        }
        break
    }

    cache.writeQuery({
      query: LATEST_COMMENTS_PUBLIC,
      variables: { id: articleId, first: COMMENTS_COUNT },
      data: {
        article: {
          ...data.article,
          pinnedComments: pinnedComments,
          comments: {
            ...data.article.comments,
            edges,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
