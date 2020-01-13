import _get from 'lodash/get'

import { toPath } from './route'

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
  const isActive = comment.state === 'active'
  const isDescendant = comment.parentComment && comment.parentComment.id
  const descendants = _get(comment, 'comments.edges', [])
  const hasActiveDescendants =
    descendants.filter(({ node }: { node: Comment }) => node.state === 'active')
      .length > 0

  // skip if comment's state is active
  if (isActive) {
    return true
  }

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

export const toCommentPath = ({
  comment
}: {
  comment: {
    id: string
    article: {
      slug: string
      mediaHash: string | null
      author: {
        userName: string | null
      }
    }
    parentComment: {
      id: string
    } | null
  }
}) => {
  const { parentComment, id } = comment
  const { slug, mediaHash, author } = comment.article
  const fragment = parentComment?.id ? `${parentComment.id}-${id}` : id

  return author.userName && mediaHash
    ? toPath({
        page: 'articleDetail',
        userName: author.userName,
        slug,
        mediaHash,
        fragment
      })
    : { href: '', as: '' }
}
