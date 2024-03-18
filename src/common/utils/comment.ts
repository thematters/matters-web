import _get from 'lodash/get'
import _has from 'lodash/has'

import { CommentState } from '~/gql/graphql'

/**
 * Filter out comment that banned/archived and hasn't descendants
 *
 * @param comments
 */
interface Comment {
  state: string
  parentComment?: {
    id: string
  } | null
}

const filterComment = (comment: Comment) => {
  // skip if comment's state is active or collapse
  if (
    comment.state === CommentState.Active ||
    comment.state === CommentState.Collapsed
  ) {
    return true
  }

  const isDescendant = comment.parentComment && comment.parentComment.id
  const descendants = _get(comment, 'comments.edges', [])
  const hasActiveDescendants =
    descendants.filter(
      ({ node }: { node: Comment }) =>
        node.state === CommentState.Active ||
        node.state === CommentState.Collapsed
    ).length > 0

  // filter out if it's a decendant comment
  if (isDescendant) {
    return false
  }

  // skip if it isn't a descendant comment and has descendant comments
  if (!isDescendant && hasActiveDescendants) {
    return true
  }

  return false
}

export function filterComments<T>(comments: Comment[]): T[] {
  return comments.filter(filterComment) as any
}

/**
 * Filter out comment that banned/archived and hasn't descendants
 *
 * @param responses
 */
export function filterResponses<T>(responses: any[]): T[] {
  return responses.filter((response) => {
    // article
    if (_has(response, 'articleState')) {
      return true
    }

    // comment
    return filterComment(response)
  })
}
