import { useApolloClient } from '@apollo/react-hooks'
import {
  Editor,
  EditorContent,
  useCommentEditor,
} from '@matters/matters-editor'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { makeMentionSuggestion } from '../Article/extensions'
import styles from './styles.module.css'

interface Props {
  content: string
  update: (params: { content: string }) => void
  placeholder?: string
  setEditor?: (editor: Editor | null) => void
}

const CommentEditor: React.FC<Props> = ({
  content,
  update,
  placeholder,
  setEditor,
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
    setEditor?.(editor)
  }, [editor])

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
