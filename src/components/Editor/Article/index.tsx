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

import { ACCEPTED_UPLOAD_IMAGE_TYPES, INPUT_DEBOUNCE } from '~/common/enums'
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

  const editor = useEditor({
    editable: !isReadOnly,
    content: content || '',
    onUpdate: async ({ editor, transaction }) => {
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
        maxCaptionLength: 100,
        placeholder: intl.formatMessage({
          defaultMessage: 'Add caption…',
          id: 'Uq6tfM',
        }),
      }),
      SmartLink.configure(makeSmartLinkOptions({ client })),
      FigureImageUploader,
      Dropcursor.configure({
        color: 'var(--color-matters-green)',
        width: 2,
      }),
      PasteDropFile.configure({
        onDrop: async (editor, files, pos) => {
          editor.commands.insertFigureImageUploaders({
            upload,
            files,
            pos,
          })
        },
        onPaste: async (editor, files) => {
          editor.commands.insertFigureImageUploaders({
            upload,
            files,
          })
        },
        mimeTypes: ACCEPTED_UPLOAD_IMAGE_TYPES,
      }),
      ...articleEditorExtensions,
    ],
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
