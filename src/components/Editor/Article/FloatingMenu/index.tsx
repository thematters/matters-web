import {
  Editor,
  FloatingMenu as TipTapFloatingMenu,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext, useState } from 'react'

import { ReactComponent as IconEditorMenuAdd } from '@/public/static/icons/32px/editor-menu-add.svg'
import { ReactComponent as IconEditorMenuCode } from '@/public/static/icons/32px/editor-menu-code.svg'
import { ReactComponent as IconEditorMenuDivider } from '@/public/static/icons/32px/editor-menu-divider.svg'
import { ReactComponent as IconEditorMenuVideo } from '@/public/static/icons/32px/editor-menu-video.svg'
import { translate } from '~/common/utils'
import { LanguageContext, withIcon } from '~/components'

import styles from './styles.css'
import globalStyles from './styles.global.css'
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
    container: true,
    expanded: expand,
  })

  return (
    <TipTapFloatingMenu
      editor={editor}
      tippyOptions={{
        theme: 'floating-menu',
        duration: 100,
        offset: [0, 0],
      }}
    >
      <section className={containerClasses}>
        <button
          className="expand-button"
          type="button"
          onClick={() => setExpand(!expand)}
          // aria-label=
        >
          {withIcon(IconEditorMenuAdd)({ size: 'lg' })}
        </button>

        {expand && (
          <div className="menu-items">
            <UploadImageButton editor={editor} upload={upload} />

            <button
              onClick={() => {
                const url = prompt('Enter YouTube, Vimeo or Bilibili URL')

                if (url) {
                  editor.chain().focus().setFigureEmbed({ src: url }).run()
                }
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

            <button
              onClick={() => {
                const url = prompt('Enter JSFiddle or CodePen URL')

                if (url) {
                  editor.chain().focus().setFigureEmbed({ src: url }).run()
                }
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
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
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

            <UploadAudioButton editor={editor} upload={upload} />
          </div>
        )}

        <style jsx>{styles}</style>
        <style jsx global>
          {globalStyles}
        </style>
      </section>
    </TipTapFloatingMenu>
  )
}
