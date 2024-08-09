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
  return comments.filter(filterComment) as any
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

export function trimCommentContent(content: string) {
  // clear empty p tag
  let trimContent = content.replace(/^(<p>\s*<\/p>)+|(<p>\s*<\/p>)+$/g, '')
  // clear empty line and space at the beginning
  trimContent = trimContent.replace(/^(<p>(<br class="smart">|\s)+)/g, '<p>')
  // clear empty line and space at the end
  trimContent = trimContent.replace(
    /((<br class="smart">|\s)+<\/p>)+$/g,
    '</p>'
  )
  return trimContent
}

export const highlightComment = (
  targetElement: HTMLElement,
  isParentComment?: boolean,
  fullSpacing?: boolean
) => {
  const activeParentCommentClass = fullSpacing
    ? styles.activeParentCommentFullSpacing
    : styles.activeParentComment
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
