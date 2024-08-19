import { useApolloClient } from '@apollo/react-hooks'
import { EditorContent, useArticleEdtor } from '@matters/matters-editor'
import { useIntl } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import {
  BYPASS_SCROLL_LOCK,
  ENBABLE_SCROLL_LOCK,
  INPUT_DEBOUNCE,
} from '~/common/enums'
import { EditorDraftFragment } from '~/gql/graphql'

import { BubbleMenu } from './BubbleMenu'
import {
  CaptionLimit,
  FigureEmbedLinkInput,
  FigurePlaceholder,
  makeMentionSuggestion,
} from './extensions'
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

  const editor = useArticleEdtor({
    editable: !isReadOnly,
    placeholder: intl.formatMessage({
      defaultMessage: 'Enter content…',
      id: 'yCTXXb',
    }),
    content: content || '',
    onUpdate: async ({ editor, transaction }) => {
      const content = editor.getHTML()
      debouncedUpdate({ content })
    },
    // FIXME: toggle body class and scroll lock when editor is focused
    // can be removed if editor is only used in single page
    // instead of being used in dialog
    onFocus: () => {
      document.body.classList.add('editor-focused')
      window.dispatchEvent(new CustomEvent(BYPASS_SCROLL_LOCK))
    },
    onBlur: () => {
      document.body.classList.remove('editor-focused')
      window.dispatchEvent(new CustomEvent(ENBABLE_SCROLL_LOCK))
    },
    mentionSuggestion: makeMentionSuggestion({ client }),
    extensions: [
      FigureEmbedLinkInput,
      FigurePlaceholder.configure({
        placeholder: intl.formatMessage({
          defaultMessage: 'Add caption…',
          id: 'Uq6tfM',
        }),
      }),
      CaptionLimit.configure({
        maxCaptionLength: 100,
      }),
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
