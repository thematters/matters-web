import _get from 'lodash/get'

/**
 * Filter out comment that banned/archived and hasn't descendants
 *
 * @param comments
 */
export const filterComments = (comments: any[]) =>
  comments.filter(comment => {
    const isBanned = comment.state === 'banned'
    const isArchived = comment.state === 'archived'
    const hasDescendantComments = _get(comment, 'comments.edges.length', 0) > 0

    let exclude = false

    if ((isBanned || isArchived) && !hasDescendantComments) {
      exclude = true
    }

    return !exclude
  })
