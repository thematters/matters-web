import { useApolloClient } from '@apollo/react-hooks'
import {
  Editor,
  EditorContent,
  useCommentEditor,
} from '@matters/matters-editor'
import { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'

import { BYPASS_SCROLL_LOCK, ENBABLE_SCROLL_LOCK } from '~/common/enums'
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
        id: 'liBHHE',
        defaultMessage: 'Any thoughts? Leave a kind comment~',
      }),
    content: content || '',
    onUpdate: async ({ editor, transaction }) => {
      const content = editor.getHTML()
      update({ content })
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
