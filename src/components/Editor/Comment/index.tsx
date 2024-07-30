import { useApolloClient } from '@apollo/react-hooks'
import {
  Editor,
  EditorContent,
  useCommentEditor,
} from '@matters/matters-editor'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { BYPASS_SCROLL_LOCK, ENBABLE_SCROLL_LOCK } from '~/common/enums'
import { useCommentEditorContext } from '~/components/Context'
import { GET_ARTICLE_BY_SHORT_HASH } from '~/components/GQL/queries/getArticle'
import { GetArticleByShortHashQuery } from '~/gql/graphql'

import { makeMentionSuggestion, SmartLink } from '../Article/extensions'
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

  placeholder =
    placeholder ||
    intl.formatMessage({
      id: 'liBHHE',
      defaultMessage: 'Any thoughts? Leave a kind comment~',
    })

  const editor = useCommentEditor({
    placeholder,
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
    extensions: [
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

  useEffect(() => {
    setEditor?.(editor)
    if (isFallbackEditor) {
      setFallbackEditor(editor)
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return

    editor.extensionManager.extensions.filter(
      (extension) => extension.name === 'placeholder'
    )[0].options['placeholder'] = placeholder

    editor.view.dispatch(editor.state.tr)
  }, [editor, placeholder])

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
