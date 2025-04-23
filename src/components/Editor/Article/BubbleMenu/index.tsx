import {
  BubbleMenu as TipTapBubbleMenu,
  Editor,
  isTextSelection,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { Node } from 'prosemirror-model'
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
import { Icon, Media } from '~/components'

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
        placement: 'top',
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

        const isFigure =
          ('node' in selection &&
            (selection.node as Node).type.name.includes('figure')) ||
          $anchor.parent.type.name.includes('figure')
        const isHr = $anchor.nodeAfter?.type.name === 'horizontalRule'
        const $grandParent = $anchor.node($anchor.depth - 1)
        const isInBlockquote = $grandParent?.type.name === 'blockquote'

        if (
          !hasEditorFocus ||
          empty ||
          isEmptyTextBlock ||
          !editor.isEditable ||
          isFigure ||
          isHr ||
          isInBlockquote
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
                onClick={() => {
                  // @ts-ignore
                  editor.chain().focus().toggleHeading({ level: 2 }).run()

                  // Manually unset bold, link if active
                  if (editor.isActive('bold')) {
                    editor.chain().focus().toggleBold().run()
                  }
                  if (editor.isActive('link')) {
                    editor.chain().focus().unsetLink().run()
                  }
                }}
                className={
                  editor.isActive('heading', { level: 2 }) ? styles.active : ''
                }
                title={intl.formatMessage({
                  defaultMessage: 'Title',
                  id: 'QKo4ol',
                  description: 'src/components/Editor',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Title',
                  id: 'QKo4ol',
                  description: 'src/components/Editor',
                })}
              >
                <Media at="sm">
                  <Icon icon={IconEditorH2} size={22} />
                </Media>
                <Media greaterThan="sm">
                  <Icon icon={IconEditorH2} size={24} />
                </Media>
              </button>
            )}

            {/* Heading 3 */}
            {!isCommentEditor && (
              <button
                type="button"
                onClick={() => {
                  // @ts-ignore
                  editor.chain().focus().toggleHeading({ level: 3 }).run()

                  // Manually unset bold if active
                  if (editor.isActive('bold')) {
                    editor.chain().focus().toggleBold().run()
                  }
                }}
                className={
                  editor.isActive('heading', { level: 3 }) ? styles.active : ''
                }
                title={intl.formatMessage({
                  defaultMessage: 'Subtitle',
                  id: 'yp0PiU',
                  description: 'src/components/Editor',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Subtitle',
                  id: 'yp0PiU',
                  description: 'src/components/Editor',
                })}
              >
                <Media at="sm">
                  <Icon icon={IconEditorH3} size={22} />
                </Media>
                <Media greaterThan="sm">
                  <Icon icon={IconEditorH3} size={24} />
                </Media>
              </button>
            )}

            {/* Bold */}
            {!isCommentEditor && (
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                  !editor.can().chain().focus().toggleBold().run() ||
                  editor.isActive('heading', { level: 2 }) ||
                  editor.isActive('heading', { level: 3 })
                }
                className={editor.isActive('bold') ? styles.active : ''}
                title={intl.formatMessage({
                  defaultMessage: 'Bold',
                  id: '1lWarA',
                  description: 'src/components/Editor',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Bold',
                  id: '1lWarA',
                  description: 'src/components/Editor',
                })}
              >
                <Media at="sm">
                  <Icon icon={IconEditorBold} size={22} />
                </Media>
                <Media greaterThan="sm">
                  <Icon icon={IconEditorBold} size={24} />
                </Media>
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
                  id: 'KG9vIx',
                  description: 'src/components/Editor',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Strikethrough',
                  id: 'KG9vIx',
                  description: 'src/components/Editor',
                })}
              >
                <Media at="sm">
                  <Icon icon={IconEditorStrike} size={22} />
                </Media>
                <Media greaterThan="sm">
                  <Icon icon={IconEditorStrike} size={24} />
                </Media>
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
                  id: 'wOYX42',
                  description: 'src/components/Editor',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Code Block',
                  id: 'wOYX42',
                  description: 'src/components/Editor',
                })}
              >
                <Media at="sm">
                  <Icon icon={IconEditorCode} size={22} />
                </Media>
                <Media greaterThan="sm">
                  <Icon icon={IconEditorCode} size={24} />
                </Media>
              </button>
            )}

            {/* Quote */}
            <button
              type="button"
              // @ts-ignore
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              // @ts-ignore
              disabled={
                !editor.can().chain().focus().toggleBlockquote().run() ||
                editor.isActive('heading', { level: 2 }) ||
                editor.isActive('heading', { level: 3 })
              }
              className={editor.isActive('blockquote') ? styles.active : ''}
              aria-label={intl.formatMessage({
                defaultMessage: 'Blockquote',
                id: '2U8rTr',
                description: 'src/components/Editor',
              })}
            >
              <Media at="sm">
                <Icon icon={IconEditorQuote} size={22} />
              </Media>
              <Media greaterThan="sm">
                <Icon icon={IconEditorQuote} size={24} />
              </Media>
            </button>

            {/* Unordered list */}
            {!isCommentEditor && (
              <button
                type="button"
                // @ts-ignore
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? styles.active : ''}
                title={intl.formatMessage({
                  defaultMessage: 'Unordered List',
                  id: 'KAuIWb',
                  description: 'src/components/Editor',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Unordered List',
                  id: 'KAuIWb',
                  description: 'src/components/Editor',
                })}
              >
                <Media at="sm">
                  <Icon icon={IconEditorUl} size={22} />
                </Media>
                <Media greaterThan="sm">
                  <Icon icon={IconEditorUl} size={24} />
                </Media>
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
                  defaultMessage: 'Ordered List',
                  id: 'AQL1ME',
                  description: 'src/components/Editor',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Ordered List',
                  id: 'AQL1ME',
                  description: 'src/components/Editor',
                })}
              >
                <Media at="sm">
                  <Icon icon={IconEditorOl} size={22} />
                </Media>
                <Media greaterThan="sm">
                  <Icon icon={IconEditorOl} size={24} />
                </Media>
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
              disabled={
                // @ts-ignore - Need to ignore the type error for toggleLink
                !editor.can().chain().focus().toggleLink({ href: '' }).run() ||
                editor.isActive('heading', { level: 2 })
              }
              className={editor.isActive('link') ? styles.active : ''}
              title={intl.formatMessage({
                defaultMessage: 'Link',
                id: 'vlEBHB',
                description: 'src/components/Editor',
              })}
              aria-label={intl.formatMessage({
                defaultMessage: 'Link',
                id: 'vlEBHB',
                description: 'src/components/Editor',
              })}
            >
              <Media at="sm">
                <Icon icon={IconEditorLink} size={22} />
              </Media>
              <Media greaterThan="sm">
                <Icon icon={IconEditorLink} size={24} />
              </Media>
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
                id: 'hB/x9Q',
                description: 'src/components/Editor',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Enter URL',
                id: 'hB/x9Q',
                description: 'src/components/Editor',
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
