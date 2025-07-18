import {
  BubbleMenu as TipTapBubbleMenu,
  Editor,
  isTextSelection,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { Node } from 'prosemirror-model'
import { useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconEdit from '@/public/static/icons/24px/edit.svg'
import IconEditorBold from '@/public/static/icons/24px/editor-bold.svg'
import IconEditorCode from '@/public/static/icons/24px/editor-code.svg'
import IconEditorH2 from '@/public/static/icons/24px/editor-h2.svg'
import IconEditorH3 from '@/public/static/icons/24px/editor-h3.svg'
import IconEditorLink from '@/public/static/icons/24px/editor-link.svg'
import IconEditorOl from '@/public/static/icons/24px/editor-ol.svg'
import IconEditorQuote from '@/public/static/icons/24px/editor-quote.svg'
import IconEditorStrike from '@/public/static/icons/24px/editor-strike.svg'
import IconEditorUl from '@/public/static/icons/24px/editor-ul.svg'
import IconEditorUnlink from '@/public/static/icons/24px/editor-unlink.svg'
import IconTimes from '@/public/static/icons/24px/times.svg'
import { BREAKPOINTS, KEYVALUE } from '~/common/enums'
import { isUrl } from '~/common/utils'
import { Icon, useMediaQuery, useNativeEventListener } from '~/components'

import styles from './styles.module.css'

export type BubbleMenuProps = {
  editor: Editor
  isCommentEditor?: boolean
}

export const BubbleMenu: React.FC<BubbleMenuProps> = ({
  editor,
  isCommentEditor,
}) => {
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
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

    // // reset the editing link
    // setInputState((prev) => ({ ...prev, isEditing: false }))

    // move the cursor to the end of the link text
    editor.commands.setTextSelection(editor.state.selection.to)
  }

  const onEditLink = () => {
    setInputState((prev) => ({ ...prev, isEditing: true }))

    setTimeout(() => {
      if (!linkInputRef.current) {
        return
      }

      linkInputRef.current.focus()

      // Move cursor to the end of the input
      const length = linkInputRef.current.value.length
      linkInputRef.current.setSelectionRange(length, length)
    })
  }

  const setAndShowLinkInput = () => {
    // set the link value
    const linkUrl = editor.getAttributes('link').href || ''
    setLinkValue(linkUrl)

    // show the link input
    setInputState({
      showInput: true,
      isEditing: false,
    })
  }

  useNativeEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const isLink = target.tagName.toLowerCase() === 'a' || target.closest('a')

    if (!isLink) {
      return
    }

    setAndShowLinkInput()

    // extend the selection
    setTimeout(() => {
      editor.chain().focus().extendMarkRange('link').run()
    })
  })

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

        if (
          !hasEditorFocus ||
          empty ||
          isEmptyTextBlock ||
          !editor.isEditable ||
          isFigure ||
          isHr
          // || isInBlockquote
        ) {
          return false
        }

        // Check if a link is selected
        const isLinkSelected = editor.isActive('link')
        if (isLinkSelected) {
          setAndShowLinkInput()
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
                  // @ts-expect-error - The type definition for toggleHeading is incorrect
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
                <Icon icon={IconEditorH2} size={isSmUp ? 24 : 22} />
              </button>
            )}

            {/* Heading 3 */}
            {!isCommentEditor && (
              <button
                type="button"
                onClick={() => {
                  // @ts-expect-error - The type definition for toggleHeading is incorrect
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
                <Icon icon={IconEditorH3} size={isSmUp ? 24 : 22} />
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
                <Icon icon={IconEditorBold} size={isSmUp ? 24 : 22} />
              </button>
            )}

            {/* Strikethrough */}
            {!isCommentEditor && (
              <button
                type="button"
                // @ts-expect-error - The type definition for toggleStrike is incorrect
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                  // @ts-expect-error - The type definition for toggleStrike is incorrect
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
                <Icon icon={IconEditorStrike} size={isSmUp ? 24 : 22} />
              </button>
            )}

            {/* Code */}
            {!isCommentEditor && (
              <button
                type="button"
                onClick={() =>
                  // @ts-expect-error - The type definition for clearNodes is incorrect
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
                <Icon icon={IconEditorCode} size={isSmUp ? 24 : 22} />
              </button>
            )}

            {/* Quote */}
            <button
              type="button"
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
              <Icon icon={IconEditorQuote} size={isSmUp ? 24 : 22} />
            </button>

            {/* Unordered list */}
            {!isCommentEditor && (
              <button
                type="button"
                // @ts-expect-error - The type definition for toggleBulletList is incorrect
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? styles.active : ''}
                title={intl.formatMessage({
                  defaultMessage: 'Unordered List',
                  id: 'KAuIWb',
                  description: 'src/components/Editor',
                })}
              >
                <Icon icon={IconEditorUl} size={isSmUp ? 24 : 22} />
              </button>
            )}

            {/* Ordered list */}
            {!isCommentEditor && (
              <button
                type="button"
                // @ts-expect-error - The type definition for toggleOrderedList is incorrect
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? styles.active : ''}
                title={intl.formatMessage({
                  defaultMessage: 'Ordered List',
                  id: 'AQL1ME',
                  description: 'src/components/Editor',
                })}
              >
                <Icon icon={IconEditorOl} size={isSmUp ? 24 : 22} />
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
              <Icon icon={IconEditorLink} size={isSmUp ? 24 : 22} />
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
                onKeyDown={(event) => {
                  if (event.key.toLowerCase() !== KEYVALUE.enter) {
                    return
                  }

                  onSubmitLink()
                }}
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
                onClick={() => {
                  setLinkValue('')
                  linkInputRef.current?.focus()
                }}
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
                  editor
                    .chain()
                    .focus()
                    .unsetLink()
                    // move to the end of the text
                    .setTextSelection(editor.state.selection.to)
                    .run()
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
