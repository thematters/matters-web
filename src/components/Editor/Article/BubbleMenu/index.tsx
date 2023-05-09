import {
  BubbleMenu as TipTapBubbleMenu,
  Editor,
  isTextSelection,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext, useState } from 'react'

import { ReactComponent as IconEditorMenuBold } from '@/public/static/icons/24px/editor-menu-bold.svg'
import { ReactComponent as IconEditorMenuCode } from '@/public/static/icons/24px/editor-menu-code.svg'
import { ReactComponent as IconEditorMenuH2 } from '@/public/static/icons/24px/editor-menu-h2.svg'
import { ReactComponent as IconEditorMenuH3 } from '@/public/static/icons/24px/editor-menu-h3.svg'
import { ReactComponent as IconEditorMenuLink } from '@/public/static/icons/24px/editor-menu-link.svg'
import { ReactComponent as IconEditorMenuOl } from '@/public/static/icons/24px/editor-menu-ol.svg'
import { ReactComponent as IconEditorMenuQuote } from '@/public/static/icons/24px/editor-menu-quote.svg'
import { ReactComponent as IconEditorMenuStrike } from '@/public/static/icons/24px/editor-menu-strike.svg'
import { ReactComponent as IconEditorMenuUl } from '@/public/static/icons/24px/editor-menu-ul.svg'
import { KEYVALUE } from '~/common/enums'
import { translate } from '~/common/utils'
import { LanguageContext, withIcon } from '~/components'

import styles from './styles.css'

export type BubbleMenuProps = {
  editor: Editor
  isCommentEditor?: boolean
}

export const BubbleMenu: React.FC<BubbleMenuProps> = ({
  editor,
  isCommentEditor,
}) => {
  const { lang } = useContext(LanguageContext)

  const [showLinkInput, setShowLinkInput] = useState(false)

  const onLinkInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() !== KEYVALUE.enter) {
      return
    }

    const url = event.currentTarget.value

    // TODO: check isURL
    if (url) {
      editor.chain().focus().toggleLink({ href: url, target: '_blank' }).run()
    }

    setShowLinkInput(false)
  }

  return (
    <TipTapBubbleMenu
      editor={editor}
      tippyOptions={{
        theme: 'bubble-menu',
        duration: 200,
        placement: 'top',
        arrow: false,
        // appendTo: () => document.body,
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

        if (
          !hasEditorFocus ||
          empty ||
          isEmptyTextBlock ||
          !editor.isEditable ||
          isFigure
        ) {
          return false
        }

        return true
      }}
    >
      <section
        className={classNames({
          container: true,
          comment: isCommentEditor,
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
                  editor.isActive('heading', { level: 2 }) ? 'active' : ''
                }
                aria-label={translate({
                  zh_hant: '標題 2',
                  zh_hans: '标题 2',
                  en: 'Heading 2',
                  lang,
                })}
              >
                {withIcon(IconEditorMenuH2)({ size: 'md' })}
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
                  editor.isActive('heading', { level: 3 }) ? 'active' : ''
                }
                aria-label={translate({
                  zh_hant: '標題 3',
                  zh_hans: '标题 3',
                  en: 'Heading 3',
                  lang,
                })}
              >
                {withIcon(IconEditorMenuH3)({ size: 'md' })}
              </button>
            )}

            {/* Bold */}
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'active' : ''}
              aria-label={translate({
                zh_hant: '粗體',
                zh_hans: '粗体',
                en: 'Bold',
                lang,
              })}
            >
              {withIcon(IconEditorMenuBold)({ size: 'md' })}
            </button>

            {/* Strikethrough */}
            <button
              type="button"
              // @ts-ignore
              onClick={() => editor.chain().focus().toggleStrike().run()}
              // @ts-ignore
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'active' : ''}
              aria-label={translate({
                zh_hant: '刪除線',
                zh_hans: '删除线',
                en: 'Strikethrough',
                lang,
              })}
            >
              {withIcon(IconEditorMenuStrike)({ size: 'md' })}
            </button>

            {/* Code */}
            <button
              type="button"
              // @ts-ignore
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              // @ts-ignore
              disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'active' : ''}
              aria-label={translate({
                zh_hant: '程式碼',
                zh_hans: '代码',
                en: 'Code Block',
                lang,
              })}
            >
              {withIcon(IconEditorMenuCode)({ size: 'md' })}
            </button>

            {/* Quote */}
            <button
              type="button"
              // @ts-ignore
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'active' : ''}
              aria-label={translate({
                zh_hant: '引用',
                zh_hans: '引用',
                en: 'Quote',
                lang,
              })}
            >
              {withIcon(IconEditorMenuQuote)({ size: 'md' })}
            </button>

            {/* Unordered list */}
            <button
              type="button"
              // @ts-ignore
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'active' : ''}
              aria-label={translate({
                zh_hant: '無序清單',
                zh_hans: '无序列表',
                en: 'Unordered list',
                lang,
              })}
            >
              {withIcon(IconEditorMenuUl)({ size: 'md' })}
            </button>

            {/* Ordered list */}
            <button
              type="button"
              // @ts-ignore
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'active' : ''}
              aria-label={translate({
                zh_hant: '有序清單',
                zh_hans: '有序列表',
                en: 'Ordered list',
                lang,
              })}
            >
              {withIcon(IconEditorMenuOl)({ size: 'md' })}
            </button>

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
              className={editor.isActive('link') ? 'active' : ''}
              aria-label={translate({
                zh_hant: '連結',
                zh_hans: '链接',
                en: 'Link',
                lang,
              })}
            >
              {withIcon(IconEditorMenuLink)({ size: 'md' })}
            </button>
          </>
        )}

        {showLinkInput && (
          <input
            type="text"
            placeholder={translate({
              zh_hant: '輸入連結地址',
              zh_hans: '输入链接地址',
              en: 'Enter URL',
              lang,
            })}
            autoFocus
            onKeyDown={onLinkInputKeyDown}
          />
        )}

        <style jsx>{styles}</style>
      </section>
    </TipTapBubbleMenu>
  )
}
