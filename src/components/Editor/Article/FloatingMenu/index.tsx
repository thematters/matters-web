import {
  Editor,
  FloatingMenu as TipTapFloatingMenu,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext, useState } from 'react'

import { ReactComponent as IconEditorMenuAdd } from '@/public/static/icons/32px/editor-menu-add.svg'
import { ReactComponent as IconEditorMenuCode } from '@/public/static/icons/32px/editor-menu-code.svg'
import { ReactComponent as IconEditorMenuDivider } from '@/public/static/icons/32px/editor-menu-divider.svg'
import { ReactComponent as IconEditorMenuQuote } from '@/public/static/icons/32px/editor-menu-quote.svg'
import { ReactComponent as IconEditorMenuVideo } from '@/public/static/icons/32px/editor-menu-video.svg'
import { translate } from '~/common/utils'
import { LanguageContext, withIcon } from '~/components'

import styles from './styles.module.css'
import UploadAudioButton from './UploadAudioButton'
import UploadImageButton, { UploadImageButtonProps } from './UploadImageButton'

export type FloatingMenuProps = {
  editor: Editor
} & Pick<UploadImageButtonProps, 'upload'>

export const FloatingMenu: React.FC<FloatingMenuProps> = ({
  editor,
  upload,
}) => {
  const { lang } = useContext(LanguageContext)
  const [expand, setExpand] = useState(false)

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.expanded]: expand,
  })

  return (
    <TipTapFloatingMenu
      editor={editor}
      tippyOptions={{
        theme: 'floating-menu',
        duration: 200,
        offset: [0, 0],
        arrow: false,
        // appendTo: () => document.body,
        onHidden: () => setExpand(false),
      }}
      shouldShow={({ view, state }) => {
        // https://github.com/ueberdosis/tiptap/blob/f387ad3dd4c2b30e/packages/extension-floating-menu/src/floating-menu-plugin.ts#L38-L55
        const { selection } = state
        const { $anchor, empty } = selection
        const isRootDepth = $anchor.depth === 1
        const isEmptyTextBlock =
          $anchor.parent.isTextblock &&
          !$anchor.parent.type.spec.code &&
          !$anchor.parent.textContent

        // figureImage, figureAudio, figureEmbed contain `<figcaption>`
        const isFigure = $anchor.parent.type.name.includes('figure')

        if (
          !view.hasFocus() ||
          !empty ||
          !isRootDepth ||
          !isEmptyTextBlock ||
          !editor.isEditable ||
          isFigure
        ) {
          return false
        }

        return true
      }}
    >
      <section className={containerClasses}>
        <button
          className={styles.expandButton}
          type="button"
          onClick={() => setExpand(!expand)}
          aria-label={translate({
            zh_hant: expand ? '收起' : '展開',
            zh_hans: expand ? '收起' : '展开',
            en: expand ? 'Collapse' : 'Expand',
          })}
        >
          {withIcon(IconEditorMenuAdd)({ size: 'lg' })}
        </button>

        {expand && (
          <div className={styles.menuItems}>
            <UploadImageButton editor={editor} upload={upload} />

            <button
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .addFigureEmbedLinkInput({
                    placeholder: translate({
                      zh_hant:
                        '貼上 YouTube、Vimeo 或 bilibili 連結後，Enter 進行新增',
                      zh_hans:
                        '贴上 YouTube、Vimeo 或 bilibili 链接后，Enter 进行新增',
                      en: 'Paste YouTube, Vimeo or bilibili link, and press enter',
                      lang,
                    }),
                  })
                  .run()
              }}
              type="button"
              title={translate({
                zh_hant: '插入影片',
                zh_hans: '插入视频',
                en: 'Insert video',
                lang,
              })}
              aria-label={translate({
                zh_hant: '插入影片',
                zh_hans: '插入视频',
                en: 'Insert video',
                lang,
              })}
            >
              {withIcon(IconEditorMenuVideo)({ size: 'lg' })}
            </button>

            <UploadAudioButton editor={editor} upload={upload} />

            <button
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .addFigureEmbedLinkInput({
                    placeholder: translate({
                      zh_hant:
                        '貼上 JSFiddle 或 CodePen 連結後，Enter 進行新增',
                      zh_hans:
                        '贴上 JSFiddle 或 CodePen 链接后，Enter 进行新增',
                      en: 'Paste JSFiddle or CodePen link, and press enter',
                      lang,
                    }),
                  })
                  .run()
              }}
              type="button"
              title={translate({
                zh_hant: '插入程式碼',
                zh_hans: '插入代码',
                en: 'Insert code',
                lang,
              })}
              aria-label={translate({
                zh_hant: '插入程式碼',
                zh_hans: '插入代码',
                en: 'Insert code',
                lang,
              })}
            >
              {withIcon(IconEditorMenuCode)({ size: 'lg' })}
            </button>

            <button
              // @ts-ignore
              onClick={() => editor.chain().focus().setBlockquote().run()}
              type="button"
              title={translate({
                zh_hant: '插入引用',
                zh_hans: '插入引用',
                en: 'Insert Blockquote',
                lang,
              })}
              aria-label={translate({
                zh_hant: '插入引用',
                zh_hans: '插入引用',
                en: 'Insert Blockquote',
                lang,
              })}
            >
              {withIcon(IconEditorMenuQuote)({ size: 'lg' })}
            </button>

            <button
              // @ts-ignore
              onClick={(e) => {
                editor.chain().focus().setHorizontalRule().run()
                setExpand(false)
              }}
              type="button"
              title={translate({
                zh_hant: '插入分隔線',
                zh_hans: '插入分隔线',
                en: 'Insert divider',
                lang,
              })}
              aria-label={translate({
                zh_hant: '插入分隔線',
                zh_hans: '插入分隔线',
                en: 'Insert divider',
                lang,
              })}
            >
              {withIcon(IconEditorMenuDivider)({ size: 'lg' })}
            </button>
          </div>
        )}
      </section>
    </TipTapFloatingMenu>
  )
}
