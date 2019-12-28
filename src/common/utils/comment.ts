import _get from 'lodash/get'

import { BaseDigestComment } from '~/components/GQL/fragments/__generated__/BaseDigestComment'

/**
 * Filter out comment that banned/archived and hasn't descendants
 *
 * @param comments
 */
export const filterComment = (comment: BaseDigestComment) => {
  const isActive = comment.state === 'active'
  const isDescendant = comment.parentComment && comment.parentComment.id
  const descendants = _get(comment, 'comments.edges', [])
  const hasActiveDescendants =
    descendants.filter(
      ({ node }: { node: BaseDigestComment }) => node.state === 'active'
    ).length > 0

  // skip if comment's state is active
  if (isActive) {
    return true
  }

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

export const filterComments = (comments: BaseDigestComment[]) =>
  comments.filter(filterComment)
