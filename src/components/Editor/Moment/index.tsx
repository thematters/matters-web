import { useApolloClient } from '@apollo/react-hooks'
import {
  Editor,
  EditorContent,
  Mention,
  momentEditorExtensions,
  PasteDropFile,
  Placeholder,
  useEditor,
} from '@matters/matters-editor'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { ADD_MOMENT_ASSETS } from '~/common/enums'
import { getValidFiles } from '~/common/utils'

import { makeMentionSuggestion, SmartLink } from '../Article/extensions'
import { makeSmartLinkOptions } from '../Article/extensions/smartLink/utils'
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
      SmartLink.configure(makeSmartLinkOptions({ client })),
      PasteDropFile.configure({
        // onDrop: async (editor, files, pos) => {
        //   const validFiles = await getValidFiles(files)
        //   console.log('onDrop', { validFiles })
        //   window.dispatchEvent(
        //     new CustomEvent(ADD_MOMENT_ASSETS, {
        //       detail: { files: validFiles },
        //     })
        //   )
        // },
        onPaste: async (editor, files) => {
          const validFiles = await getValidFiles(files)
          window.dispatchEvent(
            new CustomEvent(ADD_MOMENT_ASSETS, {
              detail: { files: validFiles },
            })
          )
        },
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
