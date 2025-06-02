import {
  Editor,
  FloatingMenu as TipTapFloatingMenu,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import IconEditorAdd from '@/public/static/icons/editor-add.svg'
import IconEditorCode from '@/public/static/icons/editor-code.svg'
import IconEditorDivider from '@/public/static/icons/editor-divider.svg'
import IconEditorH2 from '@/public/static/icons/editor-h2.svg'
import IconEditorH3 from '@/public/static/icons/editor-h3.svg'
import IconEditorOl from '@/public/static/icons/editor-ol.svg'
import IconEditorQuote from '@/public/static/icons/editor-quote.svg'
import IconEditorUl from '@/public/static/icons/editor-ul.svg'
import IconEditorVideo from '@/public/static/icons/editor-video.svg'
import { BREAKPOINTS } from '~/common/enums'
import { Icon, Tooltip, useMediaQuery } from '~/components'
import { Media } from '~/components/Media'

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
  const isMdUp = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)

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
        <Tooltip
          content={
            expand
              ? intl.formatMessage({
                  defaultMessage: 'Close Menu',
                  id: 'JD0T8w',
                  description: 'src/components/Editor',
                })
              : intl.formatMessage({
                  defaultMessage: 'Open Menu',
                  id: 'EPx6uM',
                  description: 'src/components/Editor',
                })
          }
          placement="top"
          disabled={!isMdUp}
        >
          <button
            className={styles.expandButton}
            type="button"
            onClick={() => setExpand(!expand)}
            aria-label={
              expand
                ? intl.formatMessage({
                    defaultMessage: 'Close Menu',
                    id: 'JD0T8w',
                    description: 'src/components/Editor',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Open Menu',
                    id: 'EPx6uM',
                    description: 'src/components/Editor',
                  })
            }
          >
            {<Icon icon={IconEditorAdd} size={32} />}
          </button>
        </Tooltip>

        {expand && (
          <div className={styles.menuItems}>
            {/* Image */}
            <UploadImageButton editor={editor} />

            {/* Video */}
            <Tooltip
              content={intl.formatMessage({
                defaultMessage: 'Video',
                id: 'U5FZL6',
                description: 'src/components/Editor',
              })}
              placement="top"
              disabled={!isMdUp}
            >
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
                aria-label={intl.formatMessage({
                  defaultMessage: 'Video',
                  id: 'U5FZL6',
                  description: 'src/components/Editor',
                })}
              >
                {<Icon icon={IconEditorVideo} size={32} />}
              </button>
            </Tooltip>

            {/* Audio */}
            <UploadAudioButton editor={editor} upload={upload} />

            <Media greaterThan="md" className={styles.desktopMenuItems}>
              {/* H2 */}
              <Tooltip
                content={intl.formatMessage({
                  defaultMessage: 'Title',
                  id: 'QKo4ol',
                  description: 'src/components/Editor',
                })}
                placement="top"
                disabled={!isMdUp}
              >
                <button
                  onClick={() => {
                    // @ts-expect-error - The type definition for toggleHeading is incorrect
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                    setExpand(false)
                  }}
                  type="button"
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Title',
                    id: 'QKo4ol',
                    description: 'src/components/Editor',
                  })}
                >
                  {<Icon icon={IconEditorH2} size={32} />}
                </button>
              </Tooltip>

              {/* H3 */}
              <Tooltip
                content={intl.formatMessage({
                  defaultMessage: 'Subtitle',
                  id: 'yp0PiU',
                  description: 'src/components/Editor',
                })}
                placement="top"
                disabled={!isMdUp}
              >
                <button
                  onClick={() => {
                    // @ts-expect-error - The type definition for toggleHeading is incorrect
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                    setExpand(false)
                  }}
                  type="button"
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Subtitle',
                    id: 'yp0PiU',
                    description: 'src/components/Editor',
                  })}
                >
                  {<Icon icon={IconEditorH3} size={32} />}
                </button>
              </Tooltip>

              {/* Unordered List */}
              <Tooltip
                content={intl.formatMessage({
                  defaultMessage: 'Unordered List',
                  id: 'KAuIWb',
                  description: 'src/components/Editor',
                })}
                placement="top"
                disabled={!isMdUp}
              >
                <button
                  onClick={() => {
                    // @ts-expect-error - The type definition for toggleBulletList is incorrect
                    editor.chain().focus().toggleBulletList().run()
                    setExpand(false)
                  }}
                  type="button"
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Unordered List',
                    id: 'KAuIWb',
                    description: 'src/components/Editor',
                  })}
                >
                  {<Icon icon={IconEditorUl} size={32} />}
                </button>
              </Tooltip>

              {/* Ordered List */}
              <Tooltip
                content={intl.formatMessage({
                  defaultMessage: 'Ordered List',
                  id: 'AQL1ME',
                  description: 'src/components/Editor',
                })}
                placement="top"
                disabled={!isMdUp}
              >
                <button
                  onClick={() => {
                    // @ts-expect-error - The type definition for toggleOrderedList is incorrect
                    editor.chain().focus().toggleOrderedList().run()
                    setExpand(false)
                  }}
                  type="button"
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Ordered List',
                    id: 'AQL1ME',
                    description: 'src/components/Editor',
                  })}
                >
                  {<Icon icon={IconEditorOl} size={32} />}
                </button>
              </Tooltip>
            </Media>

            {/* Code */}
            <Tooltip
              content={intl.formatMessage({
                defaultMessage: 'Code Block',
                id: 'wOYX42',
                description: 'src/components/Editor',
              })}
              placement="top"
              disabled={!isMdUp}
            >
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
                  setExpand(false)
                }}
                type="button"
                aria-label={intl.formatMessage({
                  defaultMessage: 'Code Block',
                  id: 'wOYX42',
                  description: 'src/components/Editor',
                })}
              >
                {<Icon icon={IconEditorCode} size={32} />}
              </button>
            </Tooltip>

            {/* Blockquote */}
            <Tooltip
              content={intl.formatMessage({
                defaultMessage: 'Blockquote',
                id: '2U8rTr',
                description: 'src/components/Editor',
              })}
              placement="top"
              disabled={!isMdUp}
            >
              <button
                onClick={() => {
                  editor.chain().focus().setBlockquote().run()
                  setExpand(false)
                }}
                type="button"
                title={intl.formatMessage({
                  defaultMessage: 'Blockquote',
                  id: '2U8rTr',
                  description: 'src/components/Editor',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Blockquote',
                  id: '2U8rTr',
                  description: 'src/components/Editor',
                })}
              >
                {<Icon icon={IconEditorQuote} size={32} />}
              </button>
            </Tooltip>

            {/* Divider */}
            <Tooltip
              content={intl.formatMessage({
                defaultMessage: 'Divider',
                id: '/ZmvO+',
                description: 'src/components/Editor',
              })}
              placement="top"
              disabled={!isMdUp}
            >
              <button
                onClick={() => {
                  editor.chain().focus().setHorizontalRule().run()
                  setExpand(false)
                }}
                type="button"
                title={intl.formatMessage({
                  defaultMessage: 'Divider',
                  id: '/ZmvO+',
                  description: 'src/components/Editor',
                })}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Divider',
                  id: '/ZmvO+',
                  description: 'src/components/Editor',
                })}
              >
                {<Icon icon={IconEditorDivider} size={32} />}
              </button>
            </Tooltip>
          </div>
        )}
      </section>
    </TipTapFloatingMenu>
  )
}
