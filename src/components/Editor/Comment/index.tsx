import { useApolloClient } from '@apollo/react-hooks'
import {
  Editor,
  EditorContent,
  useCommentEditor,
} from '@matters/matters-editor'
import { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'

import { ActiveCommentEditorContext } from '~/components/Context'

import { makeMentionSuggestion } from '../Article/extensions'
import styles from './styles.module.css'

interface Props {
  content: string
  update: (params: { content: string }) => void
  placeholder?: string
  setEditor?: (editor: Editor | null) => void
  syncQuote?: boolean
}

const CommentEditor: React.FC<Props> = ({
  content,
  update,
  placeholder,
  setEditor,
  syncQuote,
}) => {
  const client = useApolloClient()
  const intl = useIntl()
  const { setEditor: setActiveEditor } = useContext(ActiveCommentEditorContext)

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
    if (syncQuote) {
      setActiveEditor(editor)
    }
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
