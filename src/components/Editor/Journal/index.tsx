import { useApolloClient } from '@apollo/react-hooks'
import {
  Editor,
  EditorContent,
  useJournalEditor,
} from '@matters/matters-editor'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { BYPASS_SCROLL_LOCK, ENBABLE_SCROLL_LOCK } from '~/common/enums'

import { makeMentionSuggestion } from '../Article/extensions'
import styles from './styles.module.css'

interface Props {
  content: string
  update: (params: { content: string }) => void
  placeholder?: string
  setEditor?: (editor: Editor | null) => void
}

const JournalEditor: React.FC<Props> = ({
  content,
  update,
  placeholder,
  setEditor,
}) => {
  const client = useApolloClient()
  const intl = useIntl()

  const editor = useJournalEditor({
    // autofocus: true,
    placeholder:
      placeholder ||
      intl.formatMessage({
        id: 'EIoAY7',
        defaultMessage: '說點什麼...',
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
      window.dispatchEvent(new CustomEvent(BYPASS_SCROLL_LOCK))
    },
    onDestroy: () => {
      window.dispatchEvent(new CustomEvent(ENBABLE_SCROLL_LOCK))
    },
    mentionSuggestion: makeMentionSuggestion({ client }),
  })

  useEffect(() => {
    setEditor?.(editor)
  }, [editor])

  return (
    <div
      className={styles.journalEditor}
      id="editor" // anchor for mention plugin
    >
      <EditorContent
        editor={editor}
        onFocus={() => {
          // setActiveEditor(editor)
        }}
      />
    </div>
  )
}

export default JournalEditor
