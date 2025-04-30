import {
  BubbleMenu as TipTapBubbleMenu,
  Editor,
  isTextSelection,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { Node } from 'prosemirror-model'
import { useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconEdit } from '@/public/static/icons/24px/edit.svg'
import { ReactComponent as IconEditorBold } from '@/public/static/icons/24px/editor-bold.svg'
import { ReactComponent as IconEditorCode } from '@/public/static/icons/24px/editor-code.svg'
import { ReactComponent as IconEditorH2 } from '@/public/static/icons/24px/editor-h2.svg'
import { ReactComponent as IconEditorH3 } from '@/public/static/icons/24px/editor-h3.svg'
import { ReactComponent as IconEditorLink } from '@/public/static/icons/24px/editor-link.svg'
import { ReactComponent as IconEditorOl } from '@/public/static/icons/24px/editor-ol.svg'
import { ReactComponent as IconEditorQuote } from '@/public/static/icons/24px/editor-quote.svg'
import { ReactComponent as IconEditorStrike } from '@/public/static/icons/24px/editor-strike.svg'
import { ReactComponent as IconEditorUl } from '@/public/static/icons/24px/editor-ul.svg'
import { ReactComponent as IconEditorUnlink } from '@/public/static/icons/24px/editor-unlink.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
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
  const linkInputRef = useRef<HTMLInputElement>(null)

  const [linkValue, setLinkValue] = useState('')
  const [inputState, setInputState] = useState({
    showInput: false,
    isEditing: false,
  })

  const onSubmitLink = () => {
    let url = linkValue
    if (url && isUrl(url)) {
      // if not starts with http:// or https://
      if (!url.match(/^https?:\/\//i)) {
        url = `https://${url}`
      }
    }

    if (!url) {
      return
    }

    // set the link
    const { from, to } = editor.state.selection
    if (from === to) {
      // extend the link range first
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: '_blank' })
        .run()
    } else {
      editor.chain().focus().setLink({ href: url, target: '_blank' }).run()
    }

    // reset the editing link
    setInputState((prev) => ({ ...prev, isEditing: false }))
  }

  const onInputKeyDownLink = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() !== KEYVALUE.enter) {
      return
    }

    onSubmitLink()
  }

  const onClearLink = () => {
    setLinkValue('')
    linkInputRef.current?.focus()
  }

  const onEditLink = () => {
    setInputState((prev) => ({ ...prev, isEditing: true }))

    setTimeout(() => {
      if (!linkInputRef.current) {
        return
      }

      linkInputRef.current.focus()

      // Move cursor to the end of the text
      const length = linkInputRef.current.value.length
      linkInputRef.current.setSelectionRange(length, length)
    })
  }

  return (
    <TipTapBubbleMenu
      editor={editor}
      tippyOptions={{
        theme: 'bubble-menu',
        duration: 200,
        placement: 'top',
        arrow: false,
        onHidden: () => {
          // reset link state
          setLinkValue('')
          setInputState({
            showInput: false,
            isEditing: false,
          })
        },
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
        // const $grandParent = $anchor.node($anchor.depth - 1)
        // const isInBlockquote = $grandParent?.type.name === 'blockquote'

        // Check if a link is selected
        const isLinkSelected = editor.isActive('link')

        if (
          !hasEditorFocus ||
          (empty && !isLinkSelected) || // Allow empty selection if it's a link
          (isEmptyTextBlock && !isLinkSelected) || // Allow empty text block if it's a link
          !editor.isEditable ||
          isFigure ||
          isHr
          // || isInBlockquote
        ) {
          return false
        }

        if (isLinkSelected) {
          // set the link value
          const linkUrl = editor.getAttributes('link').href || ''
          setLinkValue(linkUrl)

          // show the link input
          setInputState({
            showInput: true,
            isEditing: false,
          })
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
        {!inputState.showInput && (
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
                  editor.isActive('heading', { level: 3 }) ||
                  editor.isActive('blockquote')
                }
                className={editor.isActive('bold') ? styles.active : ''}
                title={intl.formatMessage({
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
                disabled={
                  // @ts-ignore
                  !editor.can().chain().focus().toggleStrike().run() ||
                  editor.isActive('blockquote')
                }
                className={editor.isActive('strike') ? styles.active : ''}
                title={intl.formatMessage({
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
                onClick={() =>
                  // @ts-ignore
                  editor.chain().focus().clearNodes().toggleCodeBlock().run()
                }
                disabled={editor.isActive('codeBlock')}
                className={editor.isActive('codeBlock') ? styles.active : ''}
                title={intl.formatMessage({
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
              onClick={() =>
                editor.chain().focus().clearNodes().toggleBlockquote().run()
              }
              disabled={editor.isActive('blockquote')}
              className={editor.isActive('blockquote') ? styles.active : ''}
              title={intl.formatMessage({
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
                setInputState({
                  showInput: true,
                  isEditing: true,
                })
              }}
              disabled={
                !editor.can().chain().focus().toggleLink({ href: '' }).run() ||
                editor.isActive('heading', { level: 2 }) ||
                editor.isActive('blockquote')
              }
              className={editor.isActive('link') ? styles.active : ''}
              title={intl.formatMessage({
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

        {inputState.showInput && (
          <>
            {inputState.isEditing && (
              <input
                ref={linkInputRef}
                className={styles.linkInput}
                type="text"
                value={linkValue}
                onChange={(e) => setLinkValue(e.target.value)}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Paste the URL and press Enter',
                  id: 'HvgNHV',
                  description: 'src/components/Editor',
                })}
                autoFocus
                onKeyDown={onInputKeyDownLink}
              />
            )}
            {!inputState.isEditing && linkValue && (
              <span className={styles.linkInput}>
                <a href={linkValue} target="_blank" rel="noopener noreferrer">
                  {linkValue}
                </a>
              </span>
            )}
            {inputState.isEditing && linkValue && (
              <button
                className={styles.linkClearButton}
                type="button"
                onClick={onClearLink}
                title={intl.formatMessage({
                  defaultMessage: 'Clear',
                  id: 'TWZ1AK',
                  description: 'src/components/Editor',
                })}
              >
                <Icon icon={IconTimes} size={14} />
              </button>
            )}
            {inputState.isEditing && (
              <button
                className={styles.linkSubmitButton}
                type="button"
                onClick={onSubmitLink}
              >
                <FormattedMessage defaultMessage="Confirm" id="N2IrpM" />
              </button>
            )}
            {!inputState.isEditing && (
              <button
                className={styles.linkEditButton}
                type="button"
                onClick={onEditLink}
                title={intl.formatMessage({
                  defaultMessage: 'Edit',
                  id: 'XOtg99',
                  description: 'src/components/Editor',
                })}
              >
                <Icon icon={IconEdit} size={16} />
              </button>
            )}
            {!inputState.isEditing && (
              <button
                className={styles.linkUnlinkButton}
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetLink().run()
                }}
                title={intl.formatMessage({
                  defaultMessage: 'Unlink',
                  id: 'IJ9YcQ',
                  description: 'src/components/Editor',
                })}
              >
                <Icon icon={IconEditorUnlink} size={16} />
              </button>
            )}
          </>
        )}
      </section>
    </TipTapBubbleMenu>
  )
}
