import { useApolloClient } from '@apollo/react-hooks'
import { EditorContent, useCommentEditor } from '@matters/matters-editor'
import { useContext } from 'react'

import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'

import { BubbleMenu } from '../Article/BubbleMenu'
import { makeMentionSuggestion } from '../Article/extensions'
import styles from './styles.module.css'

interface Props {
  content: string
  update: (params: { content: string }) => void
  placeholder?: string
}

const CommentEditor: React.FC<Props> = ({ content, update, placeholder }) => {
  const { lang } = useContext(LanguageContext)
  const client = useApolloClient()

  const editor = useCommentEditor({
    placeholder:
      placeholder ||
      translate({
        zh_hant: '發表你的評論…',
        zh_hans: '发表你的评论…',
        en: 'Enter comment…',
        lang,
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
