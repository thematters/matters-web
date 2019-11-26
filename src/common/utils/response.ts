import _get from 'lodash/get'
import _has from 'lodash/has'

/**
 * Filter out comment that banned/archived and hasn't descendants
 *
 * @param responses
 */
export const filterResponses = (responses: any[]) =>
  responses.filter(response => {
    // article
    if (_has(response, 'articleState')) {
      return true
    }

    // comment
    const isBanned = response.state === 'banned'
    const isArchived = response.state === 'archived'
    const hasDescendantComments = _get(response, 'comments.edges.length', 0) > 0

    let exclude = false

    if ((isBanned || isArchived) && !hasDescendantComments) {
      exclude = true
    }

    return !exclude
  })
