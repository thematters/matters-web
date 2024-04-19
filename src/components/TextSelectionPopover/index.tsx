import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { OPEN_COMMENT_LIST_DIALOG } from '~/common/enums'
import { IconComment24, IconX20 } from '~/components'

import styles from './styles.module.css'

interface TextSelectionPopoverProps {
  targetElement: HTMLElement
}

export const TextSelectionPopover = ({
  targetElement,
}: TextSelectionPopoverProps) => {
  const [selection, setSelection] = useState<string>()
  const [position, setPosition] = useState<Record<string, number>>() // { x, y, width, height }
  const ref = useRef<HTMLDivElement>(null)

  const onSelectStart = () => {
    setSelection(undefined)
  }

  const onSelectEnd = () => {
    const activeSelection = document.getSelection()
    const text = activeSelection?.toString()

    if (!activeSelection || !text) {
      setSelection(undefined)
      return
    }

    if (!ref.current) {
      return
    }

    if (
      !targetElement ||
      !targetElement.contains(
        activeSelection.getRangeAt(0).commonAncestorContainer
      )
    ) {
      return
    }

    setSelection(text)

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect()
    const targetRect = ref.current.getBoundingClientRect()

    const tooltipHeight = 44 + 16
    const tooltipWidth = 97

    setPosition({
      x: rect.left - targetRect.left + rect.width / 2 - tooltipWidth / 2,
      y: rect.top + window.scrollY - tooltipHeight,
      width: rect.width,
      height: rect.height,
    })
  }

  useEffect(() => {
    document.addEventListener('selectstart', onSelectStart)
    document.addEventListener('mouseup', onSelectEnd)
    return () => {
      document.removeEventListener('selectstart', onSelectStart)
      document.removeEventListener('mouseup', onSelectEnd)
    }
  }, [])

  const onShare = () => {
    if (!selection) {
      return
    }
    const message = [
      `"${encodeURIComponent(selection.trim())}"`,
      encodeURIComponent(window.location.href),
    ].join('%0A%0A')
    const url = `https://twitter.com/intent/tweet?text=${message}`
    window.open(url, '_blank')
  }

  const onQuote = () => {
    if (!selection) {
      return
    }

    window.dispatchEvent(
      new CustomEvent(OPEN_COMMENT_LIST_DIALOG, {
        detail: {
          defaultCommentContent: `<blockquote>${selection}</blockquote>`,
        },
      })
    )
  }

  const containerClasses = classNames({
    [styles.tooltip]: true,
    [styles.triangle]: true,
  })

  return (
    <div aria-labelledby="share" aria-haspopup="dialog" ref={ref}>
      {selection && position && (
        <div
          className={containerClasses}
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          }}
        >
          <button onClick={onQuote} className={styles.quoteButton}>
            <IconComment24 size="mdS" />
          </button>
          <span className={styles.divider} />
          <button onClick={onShare} className={styles.shareButton}>
            <IconX20 size="mdS" />
          </button>
        </div>
      )}
    </div>
  )
}
