import { BubbleMenu as TipTapBubbleMenu, Editor } from '@matters/matters-editor'
import { useContext } from 'react'

import { ReactComponent as IconEditorMenuBold } from '@/public/static/icons/24px/editor-menu-bold.svg'
import { ReactComponent as IconEditorMenuCode } from '@/public/static/icons/24px/editor-menu-code.svg'
import { ReactComponent as IconEditorMenuH2 } from '@/public/static/icons/24px/editor-menu-h2.svg'
import { ReactComponent as IconEditorMenuLink } from '@/public/static/icons/24px/editor-menu-link.svg'
import { ReactComponent as IconEditorMenuOl } from '@/public/static/icons/24px/editor-menu-ol.svg'
import { ReactComponent as IconEditorMenuQuote } from '@/public/static/icons/24px/editor-menu-quote.svg'
import { ReactComponent as IconEditorMenuStrike } from '@/public/static/icons/24px/editor-menu-strike.svg'
import { ReactComponent as IconEditorMenuUl } from '@/public/static/icons/24px/editor-menu-ul.svg'
import { translate } from '~/common/utils'
import { LanguageContext, withIcon } from '~/components'

import styles from './styles.css'
// import globalStyles from './styles.global.css'

export type BubbleMenuProps = {
  editor: Editor
}

export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  const { lang } = useContext(LanguageContext)

  return (
    <TipTapBubbleMenu
      editor={editor}
      tippyOptions={{
        theme: 'bubble-menu',
        duration: 100,
        placement: 'auto',
      }}
    >
      <section className="container">
        <button
          onClick={() =>
            // @ts-ignore
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
          aria-label={translate({
            zh_hant: '標題 2',
            zh_hans: '标题 2',
            en: 'Heading 2',
            lang,
          })}
        >
          {withIcon(IconEditorMenuH2)({ size: 'md' })}
        </button>
        <button
          onClick={() =>
            // @ts-ignore
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}
          aria-label={translate({
            zh_hant: '標題 3',
            zh_hans: '标题 3',
            en: 'Heading 3',
            lang,
          })}
        >
          {/* FIXME: replace with h3 icon */}
          {withIcon(IconEditorMenuH2)({ size: 'md' })}
        </button>

        <button
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

        <button
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

        <button
          // @ts-ignore
          onClick={() => editor.chain().focus().toggleCode().run()}
          // @ts-ignore
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'active' : ''}
          aria-label={translate({
            zh_hant: '程式碼',
            zh_hans: '代码',
            en: 'Code',
            lang,
          })}
        >
          {withIcon(IconEditorMenuCode)({ size: 'md' })}
        </button>

        <button
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

        <button
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
        <button
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

        <button
          onClick={() => {
            // unset
            if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run()
              return
            }

            // set
            const url = prompt('Enter URL')
            if (url) {
              editor
                .chain()
                .focus()
                .toggleLink({ href: url, target: '_blank' })
                .run()
            }
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

        <style jsx>{styles}</style>
        {/* <style jsx global>
          {globalStyles}
        </style> */}
      </section>
    </TipTapBubbleMenu>
  )
}
