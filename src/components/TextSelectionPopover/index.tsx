import classNames from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconComment from '@/public/static/icons/24px/comment.svg'
import IconImage from '@/public/static/icons/24px/image.svg'
import { OPEN_COMMENT_LIST_DRAWER } from '~/common/enums'
import { isElementInViewport } from '~/common/utils'
import { analytics } from '~/common/utils'
import {
  Icon,
  isSevenDayBookArticle,
  QuoteImageDialog,
  useCommentEditorContext,
  ViewerContext,
} from '~/components'
import { ArticleLicenseType, QuoteImageArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface TextSelectionPopoverProps {
  targetElement: HTMLElement
  article?: QuoteImageArticleFragment | null
  // 'popover': floating bubble above the selection (desktop).
  // 'bottomBar': fixed action bar at the bottom of the screen (mobile) — a
  // floating bubble would fight with the iOS/Android native selection menu.
  variant?: 'popover' | 'bottomBar'
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
  article,
  variant = 'popover',
}: TextSelectionPopoverProps) => {
  const [selection, setSelection] = useState<string>()
  const [selectionText, setSelectionText] = useState<string>('')
  const [position, setPosition] = useState<Record<string, number>>() // { x, y }
  const ref = useRef<HTMLDivElement>(null)
  const { fallbackEditor, getCurrentEditor } = useCommentEditorContext()
  const [quote, setQuote] = useState<string | null>(null)
  const viewer = useContext(ViewerContext)
  const isBottomBar = variant === 'bottomBar'

  // 版權 gate：「作者保留所有權利」(ARR) 時僅作者本人可生成金句卡片；
  // CC 系列授權允許（卡片本身已忠實引用＋標註作者＋帶原文連結）
  const isAuthor = !!viewer.id && viewer.id === article?.author?.id
  const canQuoteImage =
    isAuthor || article?.license !== ArticleLicenseType.Arr

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

    // 金句卡片用純文字
    setSelectionText(activeSelection?.toString() || '')

    // fixed bottom bar needs no positioning
    if (isBottomBar) {
      return
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
    // mobile: selection is made by long-press and adjusted by dragging
    // handles; there is no reliable "selection ended" event, so debounce
    // selectionchange instead of listening to mouseup
    if (isBottomBar) {
      let timer: ReturnType<typeof setTimeout>
      const onDebouncedSelectionChange = () => {
        clearTimeout(timer)
        timer = setTimeout(onSelectEnd, 350)
      }

      document.addEventListener('selectionchange', onDebouncedSelectionChange)
      return () => {
        clearTimeout(timer)
        document.removeEventListener(
          'selectionchange',
          onDebouncedSelectionChange
        )
      }
    }

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

  const quoteImageDialog = (children: React.ReactNode, className: string) => (
    <QuoteImageDialog
      quote={selectionText}
      author={article?.author?.displayName || ''}
      title={article?.title || ''}
      shareLink={typeof window !== 'undefined' ? window.location.href : ''}
      isSevenDayBook={isSevenDayBookArticle(article)}
    >
      {({ openDialog }) => (
        <button
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: 'article_content_quote_image',
              pageType: 'article_detail',
            })
            openDialog()
          }}
          // keep the text selection when tapping the button
          onMouseDown={(e) => e.preventDefault()}
          className={className}
        >
          {children}
        </button>
      )}
    </QuoteImageDialog>
  )

  if (isBottomBar) {
    return (
      <div aria-haspopup="dialog" ref={ref}>
        {selection && (
          <div className={styles.bottomBar}>
            <button
              onClick={onQuote}
              onMouseDown={(e) => e.preventDefault()}
              className={styles.barButton}
            >
              <Icon icon={IconComment} size={20} />
              <FormattedMessage
                defaultMessage="Quote"
                id="9ZBatB"
                description="src/components/TextSelectionPopover/index.tsx"
              />
            </button>

            {canQuoteImage && (
              <>
                <span className={styles.divider} />
                {quoteImageDialog(
                  <>
                    <Icon icon={IconImage} size={20} />
                    <FormattedMessage
                      defaultMessage="Quote card"
                      id="iJfVZG"
                      description="src/components/TextSelectionPopover/index.tsx"
                    />
                  </>,
                  styles.barButton
                )}
              </>
            )}
          </div>
        )}
      </div>
    )
  }

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

          {canQuoteImage && (
            <>
              <span className={styles.divider} />
              {quoteImageDialog(
                <Icon icon={IconImage} size={20} />,
                styles.shareButton
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
