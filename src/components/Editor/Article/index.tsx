import { useApolloClient } from '@apollo/react-hooks'
import {
  articleEditorExtensions,
  Dropcursor,
  EditorContent,
  FigcaptionKit,
  Mention,
  PasteDropFile,
  Placeholder,
  useEditor,
} from '@matters/matters-editor'
import { useIntl } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import { INPUT_DEBOUNCE, MAX_FIGURE_CAPTION_LENGTH } from '~/common/enums'
import { validateImage } from '~/common/utils'
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
  const intl = useIntl()
  const client = useApolloClient()

  const { content, publishState, summary, summaryCustomized, title } = draft
  const isPending = publishState === 'pending'
  const isPublished = publishState === 'published'
  const isReadOnly = isPending || isPublished

  const debouncedUpdate = useDebouncedCallback((c) => {
    update(c)
  }, INPUT_DEBOUNCE)

  const getValidFiles = async (files: File[]) => {
    const _files = await Promise.all(
      files.map(async (file) => {
        const mime = await validateImage(file)
        return mime ? file : null
      })
    )

    return _files.filter((f) => f !== null) as File[]
  }

  const editor = useEditor({
    editable: !isReadOnly,
    content: content || '',
    onUpdate: async ({ editor }) => {
      let content = editor.getHTML()

      content = restoreImages(editor, content)

      debouncedUpdate({ content })
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
      SmartLink.configure(makeSmartLinkOptions({ client })),
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
      ...articleEditorExtensions,
    ],
  })

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
      className={styles.articleEditor}
      id="editor" // anchor for mention plugin
    >
      <EditorTitle defaultValue={title || ''} update={update} />

      <EditorSummary
        defaultValue={summaryCustomized && summary ? summary : ''}
        update={update}
        enable
      />

      {editor && <BubbleMenu editor={editor} />}
      {editor && <FloatingMenu editor={editor} upload={upload} />}

      <EditorContent editor={editor} />
    </div>
  )
}
