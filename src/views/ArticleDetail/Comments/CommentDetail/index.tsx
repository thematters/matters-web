import { useEffect, useState } from 'react'

import {
  QueryError,
  ThreadCommentBeta,
  ThreadCommentType,
  usePublicQuery,
} from '~/components'
import { CommentDetailQuery } from '~/gql/graphql'

import { Placeholder } from '../Placeholder'
import { COMMENT_DETAIL } from './gql'

const CommentDetail = () => {
  /**
   * Fragment Patterns
   *
   * 0. ``
   * 1. `#parentCommentId`
   * 2. `#parentComemntId-childCommentId`
   */
  let fragment = ''
  let parentId = ''
  let descendantId = ''
  if (typeof window !== 'undefined') {
    fragment = window.location.hash.replace('#', '')
    parentId = fragment.split('-')[0]
    descendantId = fragment.split('-')[1]
  }

  const [readyJump, setReadyJump] = useState(false)

  // Data Fetching
  const { data, loading, error } = usePublicQuery<CommentDetailQuery>(
    COMMENT_DETAIL,
    {
      variables: {
        id: parentId,
      },
    }
  )

  // Jump to comment
  useEffect(() => {
    if (readyJump) {
      let selector = `${parentId}`
      if (!!descendantId) {
        selector = `${parentId}-${descendantId}`
      }

      const comment = document.getElementById(selector)

      let targetElement = comment
      if (!!descendantId && comment) {
        targetElement = comment.parentElement
      }

      if (!targetElement) {
        return
      }

      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const currentBgColor = targetElement.style.backgroundColor

      setTimeout(() => {
        if (!targetElement) {
          return
        }
        targetElement.style.backgroundColor = 'var(--color-green-lighter)'
        if (!descendantId) {
          // parent comment
          targetElement.style.paddingLeft = 'var(--spacing-base)'
          targetElement.style.paddingRight = 'var(--spacing-base)'
          targetElement.style.marginLeft = '-1rem'
          targetElement.style.marginRight = '-1rem'
        }

        setTimeout(() => {
          if (!targetElement) {
            return
          }
          targetElement.style.backgroundColor = currentBgColor
          if (!descendantId) {
            // parent comment
            targetElement.style.paddingLeft = '0'
            targetElement.style.marginLeft = '0'
            targetElement.style.paddingRight = '0'
            targetElement.style.marginRight = '0'
          }
        }, 1000)
      }, 500)
    }
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

  if (data && data.node && data.node.__typename !== 'Comment') {
    return null
  }

  const comment = data?.node as ThreadCommentType

  return (
    <section>
      <ThreadCommentBeta
        comment={comment}
        type="article"
        hasLink
        firstRenderCallback={() => setReadyJump(true)}
        isInCommentDetail
      />
    </section>
  )
}

export default CommentDetail