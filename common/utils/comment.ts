import _get from 'lodash/get'

export const filterComments = (
  comments: any[],
  { inactive = true, pinned }: { inactive?: boolean; pinned?: boolean } = {}
) =>
  comments.filter(comment => {
    let exclude = false

    if (pinned && comment.pinned) {
      exclude = true
    }

    if (
      inactive &&
      comment.state !== 'active' &&
      _get(comment, 'comments.edges.length', 0) <= 0
    ) {
      exclude = true
    }

    return !exclude
  })
