import { useApolloClient } from '@apollo/react-hooks'
import {
  Editor,
  EditorContent,
  Mention,
  momentEditorExtensions,
  Placeholder,
  useEditor,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { makeMentionSuggestion } from '../Article/extensions'
import commonStyles from '../styles.module.css'
import styles from './styles.module.css'

interface Props {
  content: string
  update: (params: { content: string }) => void
  placeholder?: string
  setEditor?: (editor: Editor | null) => void
}

const MomentEditor: React.FC<Props> = ({
  content,
  update,
  placeholder,
  setEditor,
}) => {
  const client = useApolloClient()
  const intl = useIntl()
  placeholder =
    placeholder ||
    intl.formatMessage({
      id: 'YoiwCD',
      defaultMessage: 'Say something...',
    })

  const editor = useEditor({
    // autofocus: true,
    content: content || '',
    onUpdate: async ({ editor, transaction }) => {
      const content = editor.getHTML()
      update({ content })
    },
    extensions: [
      Placeholder.configure({
        placeholder,
      }),
      Mention.configure({
        suggestion: makeMentionSuggestion({ client }),
      }),
      ...momentEditorExtensions,
    ],
  })

  useEffect(() => {
    setEditor?.(editor)
  }, [editor])

  const editorClaaes = classNames(commonStyles.editor, styles.momentEditor)

  return (
    <div
      className={editorClaaes}
      id="editor" // anchor for mention plugin
    >
      <EditorContent editor={editor} />
    </div>
  )
}

export default MomentEditor
