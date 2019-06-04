import _get from 'lodash/get'
import _has from 'lodash/has'

export const filterResponses = (
  responses: any[],
  { inactive = true, pinned }: { inactive?: boolean; pinned?: boolean } = {}
) =>
  responses.filter(response => {
    if (_has(response, 'articleState')) {
      return true
    }

    let exclude = false

    if (pinned && response.pinned) {
      exclude = true
    }

    if (
      inactive &&
      response.state !== 'active' &&
      _get(response, 'comments.edges.length', 0) <= 0
    ) {
      exclude = true
    }

    return !exclude
  })
