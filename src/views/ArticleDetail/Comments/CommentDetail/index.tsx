import { useEffect, useRef, useState } from 'react'

import { COMMENT_FEED_ID_PREFIX } from '~/common/enums'
import { parseCommentHash } from '~/common/utils'
import {
  CommentThreadComment,
  CommentThreadCommentType,
  QueryError,
  usePublicQuery,
} from '~/components'
import { CommentDetailQuery } from '~/gql/graphql'

import { Placeholder } from '../Placeholder'
import { COMMENT_DETAIL } from './gql'
import styles from './styles.module.css'

const highlightComment = (
  targetElement: HTMLElement,
  isParentComment?: boolean
) => {
  targetElement.classList.add(styles.activeBgColor)
  if (isParentComment) {
    targetElement.classList.add(styles.activeParentComment)
  }

  const removeHighlight = () => {
    targetElement.classList.remove(styles.activeBgColor)
    if (isParentComment) {
      targetElement.classList.remove(styles.activeParentComment)
    }
  }

  setTimeout(removeHighlight, 5000)
}

const CommentDetail = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { parentId, descendantId } = parseCommentHash()

  const [readyJump, setReadyJump] = useState(false)

  // Data Fetching
  const { data, loading, error } = usePublicQuery<CommentDetailQuery>(
    COMMENT_DETAIL,
    {
      variables: {
        id: parentId,
      },
      fetchPolicy: 'network-only',
    }
  )

  // Jump to comment
  useEffect(() => {
    if (!readyJump || !ref.current) {
      return
    }

    const isParentComment = !descendantId

    const selector = isParentComment
      ? `#${COMMENT_FEED_ID_PREFIX}${parentId}`
      : `#${COMMENT_FEED_ID_PREFIX}${parentId}-${descendantId}`

    const comment = ref.current.querySelector(selector)
    const targetElement = isParentComment
      ? comment
      : comment?.parentElement || null

    if (!targetElement) {
      return
    }

    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })

    setTimeout(
      () => highlightComment(targetElement as HTMLElement, isParentComment),
      500
    )
  }, [readyJump])

  /**
   * Render
   */
  if (loading && !data) {
    return <Placeholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (data?.node?.__typename !== 'Comment') {
    return null
  }

  const comment = data.node as CommentThreadCommentType

  return (
    <section ref={ref}>
      <CommentThreadComment
        comment={comment}
        hasLink
        firstRenderCallback={() => setReadyJump(true)}
        isInCommentDetail
      />
    </section>
  )
}

export default CommentDetail
