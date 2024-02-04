import { DataProxy } from 'apollo-cache'

import { COMMENTS_COUNT } from '~/common/enums'
import { LatestCommentsPublicQuery } from '~/gql/graphql'

export const updateArticleComments = ({
  cache,
  commentId,
  articleId,
  type,
}: {
  cache: DataProxy
  commentId: string
  articleId: string
  type: 'pin' | 'unpin' | 'delete'
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
        edges = edges.filter(({ node }) => node.id !== commentId)
        if (
          !!pinnedComments &&
          pinnedComments.length > 0 &&
          commentId === pinnedComments[0].id
        ) {
          pinnedComments = []
        }
        break
    }

    cache.writeQuery({
      query: LATEST_COMMENTS_PUBLIC,
      variables: { id: articleId },
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
