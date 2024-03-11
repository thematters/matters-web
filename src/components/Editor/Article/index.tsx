import { useApolloClient } from '@apollo/react-hooks'
import { EditorContent, useArticleEdtor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { INPUT_DEBOUNCE } from '~/common/enums'
import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'
import { EditorDraftFragment } from '~/gql/graphql'

import { BubbleMenu } from './BubbleMenu'
import {
  CaptionLimit,
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
  update: (draft: {
    title?: string | null
    content?: string | null
    cover?: string | null
    summary?: string | null
  }) => Promise<void>
} & Pick<FloatingMenuProps, 'upload'>

export const ArticleEditor: React.FC<ArticleEditorProps> = ({
  draft,
  update,
  upload,
}) => {
  const { lang } = useContext(LanguageContext)
  const client = useApolloClient()

  const { content, publishState, summary, summaryCustomized, title } = draft
  const isPending = publishState === 'pending'
  const isPublished = publishState === 'published'
  const isReadOnly = isPending || isPublished

  const debouncedUpdate = useDebouncedCallback((c) => {
    update(c)
  }, INPUT_DEBOUNCE)

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
      debouncedUpdate({ content })
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
      CaptionLimit.configure({
        maxCaptionLength: 100,
      }),
    ],
  })

  return (
    <div
      className={classNames({
        [styles.articleEditor]: true,
      })}
      id="editor" // anchor for mention plugin
    >
      <EditorTitle defaultValue={title || ''} update={update} />

      <EditorSummary
        defaultValue={summaryCustomized && summary ? summary : ''}
        update={update}
        enable
      />

      {editor && <BubbleMenu editor={editor} />}
      {editor && <FloatingMenu editor={editor} upload={upload} />}

      <EditorContent editor={editor} />
    </div>
  )
}

export const EditArticleEditor: React.FC<ArticleEditorProps> = ({
  draft,

  update,
  upload,
}) => {
  const { lang } = useContext(LanguageContext)
  const client = useApolloClient()

  const { content, publishState, summary, summaryCustomized, title } = draft
  const isPending = publishState === 'pending'
  const isReadOnly = isPending

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
        [styles.revisedMode]: true,
      })}
    >
      <EditorTitle defaultValue={title || ''} readOnly update={update} />

      <EditorSummary
        defaultValue={summaryCustomized && summary ? summary : ''}
        readOnly
        update={update}
        enable
      />

      <EditorContent editor={editor} />
    </div>
  )
}
