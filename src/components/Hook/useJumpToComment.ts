import { useEffect, useRef, useState } from 'react'

import { COMMENT_FEED_ID_PREFIX } from '~/common/enums'
import { highlightComment, parseCommentHash } from '~/common/utils'

type Props = {
  fullSpacing?: boolean
}

export const useJumpToComment = ({ fullSpacing }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { parentId, descendantId } = parseCommentHash()
  const [readyJump, setReadyJump] = useState(false)

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
      () =>
        highlightComment(
          targetElement as HTMLElement,
          isParentComment,
          fullSpacing
        ),
      500
    )
  }, [readyJump])

  return { ref, setReadyJump }
}
