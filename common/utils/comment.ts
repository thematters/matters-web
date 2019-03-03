import _get from 'lodash/get'

export const filterComments = (comments: any[]) =>
  comments.filter(comment => {
    if (comment.state === 'active') {
      return true
    }

    if (_get(comment, 'comments.edges.length', 0) > 0) {
      return true
    }

    return false
  })
