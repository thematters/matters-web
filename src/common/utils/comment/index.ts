import _get from 'lodash/get'
import _has from 'lodash/has'

import { CommentState } from '~/gql/graphql'

import styles from './styles.module.css'

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

type Response = {
  articleState?: string
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
  return comments.filter(filterComment) as T[]
}

/**
 * Filter out comment that banned/archived and hasn't descendants
 *
 * @param responses
 */
export function filterResponses<T extends Response | Comment>(
  responses: T[]
): T[] {
  return responses.filter((response: T) => {
    // article
    if (_has(response, 'articleState')) {
      return true
    }

    // comment
    return filterComment(response as Comment)
  })
}

export const highlightComment = (
  targetElement: HTMLElement,
  spacing: 8 | 12 | 16 = 16,
  isParentComment?: boolean,
  fullSpacing?: boolean
) => {
  const activeParentCommentClass = fullSpacing
    ? styles[`activeParentComment${spacing}`]
    : styles[`activeParentComment${spacing}`]
  targetElement.classList.add(styles.activeBgColor)
  if (isParentComment) {
    targetElement.classList.add(activeParentCommentClass)
  }

  const removeHighlight = () => {
    targetElement.classList.remove(styles.activeBgColor)
    if (isParentComment) {
      targetElement.classList.remove(activeParentCommentClass)
    }
  }

  setTimeout(removeHighlight, 5000)
}
