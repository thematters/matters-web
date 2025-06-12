import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import IconComment from '@/public/static/icons/24px/comment.svg'
import { OPEN_COMMENT_LIST_DRAWER } from '~/common/enums'
import { isElementInViewport } from '~/common/utils'
import { analytics } from '~/common/utils'
import { Icon, useCommentEditorContext } from '~/components'

import styles from './styles.module.css'

interface TextSelectionPopoverProps {
  targetElement: HTMLElement
}

const isSelectionCrossingParagraphs = (selection: Selection): boolean => {
  if (!selection.rangeCount) {
    return false
  }

  const range = selection.getRangeAt(0)
  const commonAncestor = range.commonAncestorContainer as Element

  const allowedNodeNames = ['p', '#text']
  return (
    /\n/.test(selection.toString() || '') &&
    !allowedNodeNames.includes(commonAncestor.nodeName.toLowerCase())
  )
}

const isValidSelection = (
  selection: Selection | null,
  targetElement: HTMLElement,
  ref: React.RefObject<HTMLDivElement | null>
): boolean => {
  if (!selection || !selection.toString() || !ref.current) {
    return false
  }

  if (isSelectionCrossingParagraphs(selection)) {
    return false
  }

  const range = selection.getRangeAt(0)
  const commonAncestor = range.commonAncestorContainer

  if (!targetElement.contains(commonAncestor)) {
    return false
  }

  return true
}

export const TextSelectionPopover = ({
  targetElement,
}: TextSelectionPopoverProps) => {
  const [selection, setSelection] = useState<string>()
  const [position, setPosition] = useState<Record<string, number>>() // { x, y }
  const ref = useRef<HTMLDivElement>(null)
  const { fallbackEditor, getCurrentEditor } = useCommentEditorContext()
  const [quote, setQuote] = useState<string | null>(null)

  useEffect(() => {
    const editor = getCurrentEditor?.()
    if (!editor || !quote) {
      return
    }

    if (!isElementInViewport(editor.view.dom)) {
      editor.view.dom.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      })
    }

    setTimeout(() => {
      editor.commands.focus('end')
      editor.commands.insertContent(quote)
      editor.commands.focus('end')
      editor.commands.enter()
      editor.commands.enter()

      setQuote(null)

      //  wait for the drawer animation to complete
    }, 100)
  }, [quote, fallbackEditor])

  const onSelectStart = () => {
    setSelection(undefined)
  }

  const onSelectChange = () => {
    const activeSelection = document.getSelection()

    if (!activeSelection || !activeSelection.toString()) {
      setSelection(undefined)
    }
  }

  const onSelectEnd = () => {
    const activeSelection = document.getSelection()

    if (!isValidSelection(activeSelection, targetElement, ref)) {
      setSelection(undefined)
      return
    }

    // get html content or fallback to text content
    const range = activeSelection?.getRangeAt(0)
    const fragment = range?.cloneContents()
    const tempDiv = document.createElement('div')

    if (fragment) {
      tempDiv.appendChild(fragment)
      setSelection(tempDiv.innerHTML)
    } else {
      setSelection(activeSelection?.toString() || '')
    }

    const rect = (activeSelection as Selection)
      .getRangeAt(0)
      .getBoundingClientRect()
    const targetRect = (ref.current as HTMLDivElement).getBoundingClientRect()

    const tooltipHeight = 60 // 44 + 16 (height + margin)
    const tooltipWidth = 44

    setPosition({
      x: rect.left - targetRect.left + rect.width / 2 - tooltipWidth / 2,
      y: rect.top + window.scrollY - tooltipHeight,
    })
  }

  useEffect(() => {
    document.addEventListener('selectstart', onSelectStart)
    document.addEventListener('mouseup', onSelectEnd)
    document.addEventListener('selectionchange', onSelectChange)
    return () => {
      document.removeEventListener('selectstart', onSelectStart)
      document.removeEventListener('mouseup', onSelectEnd)
      document.removeEventListener('selectionchange', onSelectChange)
    }
  }, [])

  // const onShare = () => {
  //   if (!selection) {
  //     return
  //   }
  //   const message = [
  //     `"${encodeURIComponent(selection.trim())}"`,
  //     encodeURIComponent(window.location.href),
  //   ].join('%0A%0A')
  //   const url = `https://twitter.com/intent/tweet?text=${message}`
  //   window.open(url, '_blank')
  // }

  const onQuote = () => {
    if (!selection) {
      return
    }
    analytics.trackEvent('click_button', {
      type: 'article_content_quote',
      pageType: 'article_detail',
    })

    window.dispatchEvent(new CustomEvent(OPEN_COMMENT_LIST_DRAWER))
    setQuote(`<blockquote>${selection}</blockquote>`)
    setSelection(undefined)
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
            <Icon icon={IconComment} size={20} />
          </button>
          {/* <span className={styles.divider} />
          <button onClick={onShare} className={styles.shareButton}>
            <IconX20 size={20} />
          </button> */}
        </div>
      )}
    </div>
  )
}
