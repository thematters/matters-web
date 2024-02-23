import { useApolloClient } from '@apollo/react-hooks'
import { EditorContent, useCommentEditor } from '@matters/matters-editor'
import { useIntl } from 'react-intl'

import { BubbleMenu } from '../Article/BubbleMenu'
import { makeMentionSuggestion } from '../Article/extensions'
import styles from './styles.module.css'

interface Props {
  content: string
  update: (params: { content: string }) => void
  placeholder?: string
}

const CommentEditor: React.FC<Props> = ({ content, update, placeholder }) => {
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

  return (
    <div
      className={styles.commentEditor}
      id="editor" // anchor for mention plugin
    >
      {editor && <BubbleMenu editor={editor} isCommentEditor />}

      <EditorContent editor={editor} />
    </div>
  )
}

export default CommentEditor
