import _get from 'lodash/get'

import { BaseDigestComment } from '~/components/GQL/fragments/__generated__/BaseDigestComment'

/**
 * Filter out comment that banned/archived and hasn't descendants
 *
 * @param comments
 */
export const filterComment = (comment: BaseDigestComment) => {
  const isBanned = comment.state === 'banned'
  const isArchived = comment.state === 'archived'
  const isDescendant = comment.parentComment && comment.parentComment.id
  const hasDescendantComments = _get(comment, 'comments.edges.length', 0) > 0

  // skip if comment's state isn't banned or archived
  if (!isBanned && !isArchived) {
    return true
  }

  // filter out if it's a decendant comment
  if (isDescendant) {
    return false
  }

  // skip if it isn't a descendant comment and has descendant comments
  if (!isDescendant && hasDescendantComments) {
    return true
  }

  return false
}

export const filterComments = (comments: BaseDigestComment[]) =>
  comments.filter(filterComment)
