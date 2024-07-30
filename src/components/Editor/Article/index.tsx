import { useApolloClient } from '@apollo/react-hooks'
import { EditorContent, useArticleEdtor } from '@matters/matters-editor'
import { useIntl } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import { INPUT_DEBOUNCE } from '~/common/enums'
import { GET_ARTICLE_BY_SHORT_HASH } from '~/components/GQL/queries/getArticle'
import { EditorDraftFragment, GetArticleByShortHashQuery } from '~/gql/graphql'

import { BubbleMenu } from './BubbleMenu'
import {
  CaptionLimit,
  FigureEmbedLinkInput,
  FigurePlaceholder,
  makeMentionSuggestion,
  SmartLink,
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
  const intl = useIntl()
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
    placeholder: intl.formatMessage({
      defaultMessage: 'Enter content…',
      id: 'yCTXXb',
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
        placeholder: intl.formatMessage({
          defaultMessage: 'Add caption…',
          id: 'Uq6tfM',
        }),
      }),
      CaptionLimit.configure({
        maxCaptionLength: 100,
      }),
      SmartLink.configure({
        findRule: new RegExp(
          `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/a/(?<key>[a-zA-Z0-9]+)`,
          'g'
        ),
        search: async ({
          key,
          replace,
        }: {
          key: string
          replace: (text: string) => void
        }) => {
          const { data } = await client.query<GetArticleByShortHashQuery>({
            query: GET_ARTICLE_BY_SHORT_HASH,
            variables: { shortHash: key },
          })
          const article = data.article

          if (!article) {
            return
          }

          const link = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/a/${article.shortHash}`

          replace(
            `<a target="_blank" rel="noopener noreferrer nofollow" href="${link}">${article.title}</a>`
          )
        },
      }),
    ],
  })

  return (
    <div
      className={styles.articleEditor}
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
