import { useApolloClient } from '@apollo/react-hooks'
import {
  Editor,
  EditorContent,
  useCommentEditor,
} from '@matters/matters-editor'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

// import { BYPASS_SCROLL_LOCK, ENBABLE_SCROLL_LOCK } from '~/common/enums'
import { useCommentEditorContext } from '~/components/Context'

import { makeMentionSuggestion } from '../Article/extensions'
import styles from './styles.module.css'

interface Props {
  content: string
  update: (params: { content: string }) => void
  placeholder?: string
  setEditor?: (editor: Editor | null) => void
  isFallbackEditor?: boolean
}

const CommentEditor: React.FC<Props> = ({
  content,
  update,
  placeholder,
  setEditor,
  isFallbackEditor,
}) => {
  const client = useApolloClient()
  const intl = useIntl()
  const { setActiveEditor, setFallbackEditor } = useCommentEditorContext()

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
    // FIXME: toggle scroll lock when editor is focused
    // can be removed if editor is only used in single page
    // instead of being used in dialog
    onFocus: () => {
      // window.dispatchEvent(new CustomEvent(BYPASS_SCROLL_LOCK))
    },
    onDestroy: () => {
      // window.dispatchEvent(new CustomEvent(ENBABLE_SCROLL_LOCK))
    },
    mentionSuggestion: makeMentionSuggestion({ client }),
  })

  useEffect(() => {
    setEditor?.(editor)
    if (isFallbackEditor) {
      setFallbackEditor(editor)
    }
  }, [editor])

  return (
    <div
      className={styles.commentEditor}
      id="editor" // anchor for mention plugin
    >
      <EditorContent
        editor={editor}
        onFocus={() => {
          if (setActiveEditor) {
            setActiveEditor(editor)
          }
        }}
      />
    </div>
  )
}

export default CommentEditor
