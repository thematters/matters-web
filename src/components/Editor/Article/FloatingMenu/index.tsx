import {
  Editor,
  FloatingMenu as TipTapFloatingMenu,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { ReactComponent as IconEditorAdd } from '@/public/static/icons/editor-add.svg'
import { ReactComponent as IconEditorCode } from '@/public/static/icons/editor-code.svg'
import { ReactComponent as IconEditorDivider } from '@/public/static/icons/editor-divider.svg'
import { ReactComponent as IconEditorQuote } from '@/public/static/icons/editor-quote.svg'
import { ReactComponent as IconEditorVideo } from '@/public/static/icons/editor-video.svg'
import { Icon } from '~/components'

import styles from './styles.module.css'
import UploadAudioButton, { UploadAudioButtonProps } from './UploadAudioButton'
import UploadImageButton from './UploadImageButton'

export type FloatingMenuProps = {
  editor: Editor
} & Pick<UploadAudioButtonProps, 'upload'>

export const FloatingMenu: React.FC<FloatingMenuProps> = ({
  editor,
  upload,
}) => {
  const intl = useIntl()
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
          aria-label={
            expand
              ? intl.formatMessage({
                  defaultMessage: 'Collapse',
                  id: 'W/V6+Y',
                })
              : intl.formatMessage({
                  defaultMessage: 'Expand',
                  id: '0oLj/t',
                })
          }
        >
          {<Icon icon={IconEditorAdd} size={32} />}
        </button>

        {expand && (
          <div className={styles.menuItems}>
            <UploadImageButton editor={editor} />

            <button
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .addFigureEmbedLinkInput({
                    placeholder: intl.formatMessage({
                      defaultMessage:
                        'Paste YouTube, Vimeo or bilibili link, and press enter',
                      id: 'r9LhcI',
                    }),
                  })
                  .run()
              }}
              type="button"
              title={intl.formatMessage({
                defaultMessage: 'Insert video',
                id: 'Jr12wo',
              })}
              aria-label={intl.formatMessage({
                defaultMessage: 'Insert video',
                id: 'Jr12wo',
              })}
            >
              {<Icon icon={IconEditorVideo} size={32} />}
            </button>

            <UploadAudioButton editor={editor} upload={upload} />

            <button
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .addFigureEmbedLinkInput({
                    placeholder: intl.formatMessage({
                      defaultMessage:
                        'Paste JSFiddle or CodePen link, and press enter',
                      id: '3EeDnu',
                    }),
                  })
                  .run()
              }}
              type="button"
              title={intl.formatMessage({
                defaultMessage: 'Insert code',
                id: '5Ga0iK',
              })}
              aria-label={intl.formatMessage({
                defaultMessage: 'Insert code',
                id: '5Ga0iK',
              })}
            >
              {<Icon icon={IconEditorCode} size={32} />}
            </button>

            <button
              onClick={() => editor.chain().focus().setBlockquote().run()}
              type="button"
              title={intl.formatMessage({
                defaultMessage: 'Insert Blockquote',
                id: 'mObpsB',
              })}
              aria-label={intl.formatMessage({
                defaultMessage: 'Insert Blockquote',
                id: 'mObpsB',
              })}
            >
              {<Icon icon={IconEditorQuote} size={32} />}
            </button>

            <button
              onClick={(e) => {
                editor.chain().focus().setHorizontalRule().run()
                setExpand(false)
              }}
              type="button"
              title={intl.formatMessage({
                defaultMessage: 'Insert divider',
                id: 'QfVedX',
              })}
              aria-label={intl.formatMessage({
                defaultMessage: 'Insert divider',
                id: 'QfVedX',
              })}
            >
              {<Icon icon={IconEditorDivider} size={32} />}
            </button>
          </div>
        )}
      </section>
    </TipTapFloatingMenu>
  )
}
