import { EditorContent, useArticleEdtor } from '@matters/matters-editor'
import { useContext } from 'react'

import editorStyles from '~/common/styles/utils/content.article.css'
import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'
import { EditorDraftFragment } from '~/gql/graphql'

import { mentionSuggestion } from './extensions'
import { FloatingMenu, FloatingMenuProps } from './FloatingMenu'
import styles from './styles.css'
import globalStyles from './styles.global.css'
import EditorSummary from './Summary'
import EditorTitle from './Title'

type ArticleEditorProps = {
  draft: EditorDraftFragment

  isReviseMode?: boolean
  isSummaryReadOnly?: boolean
  isTitleReadOnly?: boolean

  update: (draft: {
    title?: string | null
    content?: string | null
    cover?: string | null
    summary?: string | null
  }) => Promise<void>
} & Pick<FloatingMenuProps, 'upload'>

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  draft,

  isReviseMode = false,
  isSummaryReadOnly = false,
  isTitleReadOnly = false,

  update,
  upload,
}) => {
  const { lang } = useContext(LanguageContext)

  const { content, publishState, summary, summaryCustomized, title } = draft
  const isPending = publishState === 'pending'
  const isPublished = publishState === 'published'
  const isReadOnly = (isPending || isPublished) && !isReviseMode

  const editor = useArticleEdtor({
    editable: !isReadOnly,
    placeholder: translate({
      zh_hant: '請輸入正文…',
      zh_hans: '请输入正文…',
      en: 'Enter content ...',
      lang,
    }),
    content: content || '',
    // onCreate: () => {
    // initAudioPlayers()
    // },
    onUpdate: async ({ editor, transaction }) => {
      // initAudioPlayers()

      const content = editor.getHTML()

      // console.log(editor, transaction)
      // console.log(await html2md(content))
      update({ content })
    },
    mentionSuggestion,
  })

  return (
    <>
      <div className="container">
        <EditorTitle
          defaultValue={title || ''}
          readOnly={isTitleReadOnly}
          update={update}
        />

        <EditorSummary
          defaultValue={summaryCustomized && summary ? summary : ''}
          readOnly={isSummaryReadOnly}
          update={update}
          enable
        />

        {editor && <FloatingMenu editor={editor} upload={upload} />}

        <EditorContent editor={editor} />
      </div>

      <style jsx>{styles}</style>
      <style jsx>{editorStyles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

export default ArticleEditor
