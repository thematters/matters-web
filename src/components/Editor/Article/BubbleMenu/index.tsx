import {
  BubbleMenu as TipTapBubbleMenu,
  Editor,
  isTextSelection,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconEditorBold } from '@/public/static/icons/24px/editor-bold.svg'
import { ReactComponent as IconEditorCode } from '@/public/static/icons/24px/editor-code.svg'
import { ReactComponent as IconEditorH2 } from '@/public/static/icons/24px/editor-h2.svg'
import { ReactComponent as IconEditorH3 } from '@/public/static/icons/24px/editor-h3.svg'
import { ReactComponent as IconEditorLink } from '@/public/static/icons/24px/editor-link.svg'
import { ReactComponent as IconEditorOl } from '@/public/static/icons/24px/editor-ol.svg'
import { ReactComponent as IconEditorQuote } from '@/public/static/icons/24px/editor-quote.svg'
import { ReactComponent as IconEditorStrike } from '@/public/static/icons/24px/editor-strike.svg'
import { ReactComponent as IconEditorUl } from '@/public/static/icons/24px/editor-ul.svg'
import { KEYVALUE } from '~/common/enums'
import { isUrl } from '~/common/utils'
import { withIcon } from '~/components'

import styles from './styles.module.css'

export type BubbleMenuProps = {
  editor: Editor
  isCommentEditor?: boolean
}

export const BubbleMenu: React.FC<BubbleMenuProps> = ({
  editor,
  isCommentEditor,
}) => {
  const intl = useIntl()
  const urlInput = useRef<HTMLInputElement>(null)

  const [showLinkInput, setShowLinkInput] = useState(false)

  const onUrlInputSubmit = () => {
    let url = urlInput?.current?.value

    if (url && isUrl(url)) {
      // if not starts with http:// or https://
      if (!url.match(/^https?:\/\//i)) {
        url = `https://${url}`
      }
      editor.chain().focus().toggleLink({ href: url, target: '_blank' }).run()
    }

    setShowLinkInput(false)
  }

  const onLinkInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() !== KEYVALUE.enter) {
      return
    }

    onUrlInputSubmit()
  }

  return (
    <TipTapBubbleMenu
      editor={editor}
      tippyOptions={{
        theme: 'bubble-menu',
        duration: 200,
        placement: 'auto-start',
        arrow: false,
        onHidden: () => setShowLinkInput(false),
      }}
      shouldShow={({ view, state, from, to }) => {
        // https://github.com/ueberdosis/tiptap/blob/f387ad3dd4c2b30e/packages/extension-bubble-menu/src/bubble-menu-plugin.ts#L47
        const { doc, selection } = state
        const { empty, $anchor } = selection

        // Sometime check for `empty` is not enough.
        // Doubleclick an empty paragraph returns a node size of 2.
        // So we check also for an empty text size.
        const isEmptyTextBlock =
          !doc.textBetween(from, to).length && isTextSelection(state.selection)

        // When clicking on a element inside the bubble menu the editor "blur" event
        // is called and the bubble menu item is focussed. In this case we should
        // consider the menu as part of the editor and keep showing the menu
        // const isChildOfMenu = this.element.contains(document.activeElement)

        const hasEditorFocus = view.hasFocus()
        //  || isChildOfMenu

        // figureImage, figureAudio, figureEmbed contain `<figcaption>`
        const isFigure = $anchor.parent.type.name.includes('figure')

        // hr
        const isHr = $anchor.nodeAfter?.type.name.includes('horizontalRule')

        if (
          !hasEditorFocus ||
          empty ||
          isEmptyTextBlock ||
          !editor.isEditable ||
          isFigure ||
          isHr
        ) {
          return false
        }

        return true
      }}
    >
      <section
        className={classNames({
          [styles.container]: true,
          [styles.comment]: isCommentEditor,
        })}
      >
        {!showLinkInput && (
          <>
            {/* Heading 2 */}
            {!isCommentEditor && (
              <button
                type="button"
                onClick={() =>
                  // @ts-ignore
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive('heading', { level: 2 }) ? styles.active : ''
                }
                title={intl.formatMessage({
                  defaultMessage: 'Heading 2',
                  id: 'Zqekct',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Heading 2',
                  id: 'Zqekct',
                })}
              >
                {withIcon(IconEditorH2)({ size: 24 })}
              </button>
            )}

            {/* Heading 3 */}
            {!isCommentEditor && (
              <button
                type="button"
                onClick={() =>
                  // @ts-ignore
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive('heading', { level: 3 }) ? styles.active : ''
                }
                title={intl.formatMessage({
                  defaultMessage: 'Heading 3',
                  id: 'BDbgCL',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Heading 3',
                  id: 'BDbgCL',
                })}
              >
                {withIcon(IconEditorH3)({ size: 24 })}
              </button>
            )}

            {/* Bold */}
            {!isCommentEditor && (
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? styles.active : ''}
                title={intl.formatMessage({
                  defaultMessage: 'Bold',
                  id: 'Dkkmwm',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Bold',
                  id: 'Dkkmwm',
                })}
              >
                {withIcon(IconEditorBold)({ size: 24 })}
              </button>
            )}

            {/* Strikethrough */}
            {!isCommentEditor && (
              <button
                type="button"
                // @ts-ignore
                onClick={() => editor.chain().focus().toggleStrike().run()}
                // @ts-ignore
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? styles.active : ''}
                title={intl.formatMessage({
                  defaultMessage: 'Strikethrough',
                  id: 'lH8y+X',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Strikethrough',
                  id: 'lH8y+X',
                })}
              >
                {withIcon(IconEditorStrike)({ size: 24 })}
              </button>
            )}

            {/* Code */}
            {!isCommentEditor && (
              <button
                type="button"
                // @ts-ignore
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                // @ts-ignore
                disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? styles.active : ''}
                title={intl.formatMessage({
                  defaultMessage: 'Code Block',
                  id: 'fJFvPm',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Code Block',
                  id: 'fJFvPm',
                })}
              >
                {withIcon(IconEditorCode)({ size: 24 })}
              </button>
            )}

            {/* Quote */}
            <button
              type="button"
              // @ts-ignore
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              disabled={
                (!isCommentEditor &&
                  // @ts-ignore
                  !editor.can().chain().focus().toggleCodeBlock().run()) ||
                editor.isActive('codeBlock')
              }
              className={editor.isActive('blockquote') ? styles.active : ''}
              aria-label={intl.formatMessage({
                defaultMessage: 'Quote',
                id: 'atzUcB',
              })}
            >
              {withIcon(IconEditorQuote)({ size: 24 })}
            </button>

            {/* Unordered list */}
            {!isCommentEditor && (
              <button
                type="button"
                // @ts-ignore
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? styles.active : ''}
                title={intl.formatMessage({
                  defaultMessage: 'Unordered list',
                  id: 'Onjs6P',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Unordered list',
                  id: 'Onjs6P',
                })}
              >
                {withIcon(IconEditorUl)({ size: 24 })}
              </button>
            )}

            {/* Ordered list */}
            {!isCommentEditor && (
              <button
                type="button"
                // @ts-ignore
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? styles.active : ''}
                title={intl.formatMessage({
                  defaultMessage: 'Ordered list',
                  id: '5j/gIz',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Ordered list',
                  id: '5j/gIz',
                })}
              >
                {withIcon(IconEditorOl)({ size: 24 })}
              </button>
            )}

            {/* Link */}
            <button
              type="button"
              onClick={() => {
                // unset
                if (editor.isActive('link')) {
                  editor.chain().focus().unsetLink().run()
                  return
                }

                // show link input
                setShowLinkInput(true)
              }}
              // @ts-ignore
              disabled={!editor.can().chain().focus().toggleLink().run()}
              className={editor.isActive('link') ? styles.active : ''}
              title={intl.formatMessage({
                defaultMessage: 'Link',
                id: 'JBWS0c',
              })}
              aria-label={intl.formatMessage({
                defaultMessage: 'Link',
                id: 'JBWS0c',
              })}
            >
              {withIcon(IconEditorLink)({ size: 24 })}
            </button>
          </>
        )}

        {showLinkInput && (
          <>
            <input
              className="urlInput"
              ref={urlInput}
              type="text"
              title={intl.formatMessage({
                defaultMessage: 'Enter URL',
                id: 'gluNT8',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Enter URL',
                id: 'gluNT8',
              })}
              autoFocus
              onKeyDown={onLinkInputKeyDown}
            />
            <button
              className="urlSubmitButton"
              type="button"
              onClick={onUrlInputSubmit}
            >
              <FormattedMessage defaultMessage="Confirm" id="N2IrpM" />
            </button>
          </>
        )}
      </section>
    </TipTapBubbleMenu>
  )
}
