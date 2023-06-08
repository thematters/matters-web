import { useApolloClient } from '@apollo/react-hooks'
import { EditorContent, useArticleEdtor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext } from 'react'

import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'
import { EditorDraftFragment } from '~/gql/graphql'

import { BubbleMenu } from './BubbleMenu'
import {
  FigureEmbedLinkInput,
  FigurePlaceholder,
  makeMentionSuggestion,
} from './extensions'
import { FloatingMenu, FloatingMenuProps } from './FloatingMenu'
import styles from './styles.module.css'
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
  const client = useApolloClient()

  const { content, publishState, summary, summaryCustomized, title } = draft
  const isPending = publishState === 'pending'
  const isPublished = publishState === 'published'
  const isReadOnly = (isPending || isPublished) && !isReviseMode

  const editor = useArticleEdtor({
    editable: !isReadOnly,
    placeholder: translate({
      zh_hant: '請輸入正文…',
      zh_hans: '请输入正文…',
      en: 'Enter content…',
      lang,
    }),
    content: content || '',
    onUpdate: async ({ editor, transaction }) => {
      const content = editor.getHTML()
      update({ content })
    },
    mentionSuggestion: makeMentionSuggestion({ client }),
    extensions: [
      FigureEmbedLinkInput,
      FigurePlaceholder.configure({
        placeholder: translate({
          zh_hant: '添加說明文字…',
          zh_hans: '添加说明文字…',
          en: 'Add caption…',
          lang,
        }),
      }),
    ],
  })

  return (
    <div
      className={classNames({
        [styles.articleEditor]: true,
        [styles.revisedMode]: isReviseMode,
      })}
    >
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

      {editor && <BubbleMenu editor={editor} />}
      {editor && <FloatingMenu editor={editor} upload={upload} />}

      <EditorContent editor={editor} />
    </div>
  )
}

export default ArticleEditor
