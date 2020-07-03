import _get from 'lodash/get'
import _has from 'lodash/has'

import { filterComment } from './comment'

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

export const responseStateIs = (
  response: any,
  state: 'active' | 'archived' | 'banned' | 'collapsed'
): boolean => {
  // comment
  if (response.hasOwnProperty('state')) {
    return response.state === state
  }

  // article
  if (response.hasOwnProperty('articleState')) {
    return response.articleState === state
  }

  return true
}
