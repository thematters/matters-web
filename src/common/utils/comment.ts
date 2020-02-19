import _get from 'lodash/get'

/**
 * Filter out comment that banned/archived and hasn't descendants
 *
 * @param comments
 */
interface Comment {
  state: string
  parentComment: {
    id: string
  } | null
}

export const filterComment = (comment: Comment) => {
  // skip if comment's state is active or collapse
  if (comment.state === 'active' || comment.state === 'collapsed') {
    return true
  }

  const isDescendant = comment.parentComment && comment.parentComment.id
  const descendants = _get(comment, 'comments.edges', [])
  const hasActiveDescendants =
    descendants.filter(
      ({ node }: { node: Comment }) =>
        node.state === 'active' || node.state === 'collapsed'
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

export const filterComments = (comments: Comment[]) =>
  comments.filter(filterComment)
