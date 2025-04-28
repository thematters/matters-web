import { useApolloClient } from '@apollo/client'
import {
  articleEditorExtensions,
  Dropcursor,
  EditorContent,
  Extension,
  FigcaptionKit,
  Link,
  Mention,
  PasteDropFile,
  Placeholder,
  useEditor,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { useCallback, useContext, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import {
  FOCUS_EDITOR_SUMMARY,
  INPUT_DEBOUNCE,
  KEYVALUE,
  MAX_FIGURE_CAPTION_LENGTH,
} from '~/common/enums'
import { getValidFiles } from '~/common/utils'
import { LanguageContext } from '~/components/Context'
import { useNativeEventListener } from '~/components/Hook'
import { EditorDraftFragment } from '~/gql/graphql'

import { BubbleMenu } from './BubbleMenu'
import {
  FigureEmbedLinkInput,
  FigureImageUploader,
  makeMentionSuggestion,
  restoreImages,
  SmartLink,
} from './extensions'
// import { Link } from './extensions/link'
import { makeSmartLinkOptions } from './extensions/smartLink/utils'
import { FloatingMenu, FloatingMenuProps } from './FloatingMenu'
import styles from './styles.module.css'
import EditorSummary from './Summary'
import EditorTitle from './Title'

type ArticleEditorProps = {
  draft: EditorDraftFragment
  update: (draft: {
    title?: string | null
    content?: string | null
    cover?: string | null
    summary?: string | null
  }) => Promise<void>
} & Pick<FloatingMenuProps, 'upload'>

export const ArticleEditor: React.FC<ArticleEditorProps> = ({
  draft,
  update,
  upload,
}) => {
  const { lang } = useContext(LanguageContext)
  const intl = useIntl()
  const client = useApolloClient()

  const {
    content,
    publishState,
    summary,
    summaryCustomized,
    title,
    indentFirstLine,
  } = draft
  const isPending = publishState === 'pending'
  const isPublished = publishState === 'published'
  const isReadOnly = isPending || isPublished

  const debouncedUpdate = useDebouncedCallback((c) => {
    update(c)
  }, INPUT_DEBOUNCE)

  const editorContentClasses = classNames({
    'u-content-article': true,
    [styles.indented]: indentFirstLine,
  })

  const editor = useEditor({
    editable: !isReadOnly,
    content: content || '',
    onUpdate: async ({ editor }) => {
      let content = editor.getHTML()

      content = restoreImages(editor, content)

      debouncedUpdate({ content })
    },
    editorProps: {
      attributes: {
        class: editorContentClasses,
      },
      handleKeyDown: (view, event) => {
        if (
          event.key.toLowerCase() === KEYVALUE.backSpace &&
          view.state.selection.from <= 1
        ) {
          window.dispatchEvent(new CustomEvent(FOCUS_EDITOR_SUMMARY))
        }
      },
    },
    extensions: [
      Placeholder.configure({
        placeholder: intl.formatMessage({
          defaultMessage: 'Enter content…',
          id: 'yCTXXb',
        }),
      }),
      Mention.configure({
        suggestion: makeMentionSuggestion({ client }),
      }),
      FigureEmbedLinkInput,
      FigcaptionKit.configure({
        maxCaptionLength: MAX_FIGURE_CAPTION_LENGTH,
        placeholder: intl.formatMessage({
          defaultMessage: 'Add caption…',
          id: 'Uq6tfM',
        }),
      }),
      SmartLink.configure(makeSmartLinkOptions({ client, lang })),
      FigureImageUploader.configure({
        upload,
        update,
        placeholder: intl.formatMessage({
          defaultMessage: 'Add caption…',
          id: 'Uq6tfM',
        }),
      }),
      Dropcursor.configure({
        color: 'var(--color-matters-green)',
        width: 2,
      }),
      PasteDropFile.configure({
        onDrop: async (editor, files, pos) => {
          const validFiles = await getValidFiles(files)
          editor.commands.insertFigureImageUploaders({ files: validFiles, pos })
        },
        onPaste: async (editor, files) => {
          const validFiles = await getValidFiles(files)
          editor.commands.insertFigureImageUploaders({ files: validFiles })
        },
      }),
      Link.configure({ openOnClick: false }),
      ...articleEditorExtensions.filter(
        (ext) => !['link', 'figcaptionKit', 'placeholder'].includes(ext.name)
      ),
    ] as Extension[],
  })

  const editorRef = useRef<HTMLDivElement>(null)
  const handleEditorClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const $editor = editorRef.current

      if (!$editor || !editor) return

      const { clientHeight } = $editor
      const paddingBottom = parseInt(
        window.getComputedStyle($editor).paddingBottom,
        10
      )
      const clickY = event.nativeEvent.offsetY

      if (clickY > clientHeight - paddingBottom && clickY <= clientHeight) {
        // move cursor to end
        editor.commands.focus('end')

        // insert paragraph
        editor.commands.insertContentAt(editor.state.selection.to, [
          { type: 'paragraph' },
        ])
      }
    },
    [editor]
  )

  // fallback drop handler for non-editor area
  useNativeEventListener<DragEvent>('drop', async (event) => {
    const target = event.target
    const files = Array.from(event.dataTransfer?.files || [])

    if (!editor || !files) return

    // skip if it's inside editor area
    if (editor.view.dom.contains(target as Node)) {
      return
    }

    event.preventDefault()

    const validFiles = await getValidFiles(files)
    editor.commands.insertFigureImageUploaders({ files: validFiles })
  })

  useNativeEventListener<DragEvent>('dragover', (e) => {
    e.preventDefault()
  })

  return (
    <div
      id="editor"
      className={styles.articleEditor}
      ref={editorRef}
      onClick={handleEditorClick}
    >
      <EditorTitle defaultValue={title || ''} update={update} />

      <EditorSummary
        defaultValue={summaryCustomized && summary ? summary : ''}
        update={update}
        enable
        editor={editor}
      />

      {editor && <BubbleMenu editor={editor} />}
      {editor && <FloatingMenu editor={editor} upload={upload} />}

      <EditorContent editor={editor} />
    </div>
  )
}
