import { useApolloClient } from '@apollo/react-hooks'
import { EditorContent, useCommentEditor } from '@matters/matters-editor'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { SYNC_QUOTE_COMMENT } from '~/common/enums'
import { useEventListener } from '~/components/Hook'

import { makeMentionSuggestion } from '../Article/extensions'
import styles from './styles.module.css'

interface Props {
  content: string
  update: (params: { content: string }) => void
  placeholder?: string
  syncQuoteComment?: boolean
}

const CommentEditor: React.FC<Props> = ({
  content,
  update,
  placeholder,
  syncQuoteComment,
}) => {
  const client = useApolloClient()
  const intl = useIntl()

  const editor = useCommentEditor({
    placeholder:
      placeholder ||
      intl.formatMessage({
        id: 'jwnump',
        defaultMessage: 'Comment...',
      }),
    content: content || '',
    onUpdate: async ({ editor, transaction }) => {
      const content = editor.getHTML()
      update({ content })
    },
    mentionSuggestion: makeMentionSuggestion({ client }),
  })

  useEffect(() => {
    if (!content || !syncQuoteComment || !editor) {
      return
    }

    editor.commands.focus('end')
    editor.commands.enter()
    editor.commands.enter()
  }, [editor])

  useEventListener(SYNC_QUOTE_COMMENT, (payload: { [key: string]: any }) => {
    if (!syncQuoteComment) {
      return
    }

    const { content } = payload
    if (!editor || !content) {
      return
    }

    editor.commands.focus('end')
    editor.commands.insertContent(content)
    editor.commands.focus('end')
    editor.commands.enter()
    editor.commands.enter()
  })

  return (
    <div
      className={styles.commentEditor}
      id="editor" // anchor for mention plugin
    >
      <EditorContent editor={editor} />
    </div>
  )
}

export default CommentEditor
