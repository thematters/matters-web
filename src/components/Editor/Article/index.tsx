// import { useLazyQuery } from '@apollo/react-hooks'
// import { MattersArticleEditor } from '@matters/matters-editor'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Gapcursor from '@tiptap/extension-gapcursor'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Strike from '@tiptap/extension-strike'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import { useContext } from 'react'

import {
  // ADD_TOAST,
  ASSET_TYPE,
} from '~/common/enums'
import editorStyles from '~/common/styles/utils/content.article.css'
import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'
// import SEARCH_USERS from '~/components/GQL/queries/searchUsers'
import {
  EditorDraftFragment,
  // SearchUsersQuery
} from '~/gql/graphql'

import MenuBar from './MenuBar'
// import MentionUserList from '../MentionUserList'
import styles from './styles.css'
import EditorSummary from './Summary'
import EditorTitle from './Title'

interface Props {
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
  upload: (input: {
    file?: any
    url?: string
    type?: ASSET_TYPE.embed | ASSET_TYPE.embedaudio
  }) => Promise<{
    id: string
    path: string
  }>
}

// type SearchUsersSearchEdgesNodeUser = NonNullable<
//   NonNullable<SearchUsersQuery['search']['edges']>[0]['node'] & {
//     __typename: 'User'
//   }
// >

const ArticleEditor: React.FC<Props> = ({
  draft,

  isReviseMode = false,
  isSummaryReadOnly = false,
  isTitleReadOnly = false,

  update,
  upload,
}) => {
  // const [search, searchResult] = useLazyQuery<SearchUsersQuery>(SEARCH_USERS)
  const { lang } = useContext(LanguageContext)

  const { content, publishState, summary, summaryCustomized, title } = draft
  const isPending = publishState === 'pending'
  const isPublished = publishState === 'published'
  const isReadOnly = (isPending || isPublished) && !isReviseMode
  // const { data, loading } = searchResult

  // const mentionUsers = (data?.search.edges || []).map(
  //   ({ node }: any) => node
  // ) as SearchUsersSearchEdgesNodeUser[]

  // const mentionKeywordChange = (keyword: string) => {
  //   search({ variables: { search: keyword, exclude: 'blocked' } })
  // }

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Link,
      Heading.configure({
        levels: [2, 3],
      }),
      OrderedList,
      ListItem,
      BulletList,
      Strike,
      Italic,
      Bold,
      Underline,
      Code,
      CodeBlock,
      Blockquote,
      HorizontalRule,
      HardBreak,
      HorizontalRule,
      History,
      Gapcursor,
      Placeholder.configure({
        placeholder: translate({
          zh_hant: '請輸入正文…',
          zh_hans: '请输入正文…',
          en: 'Enter content ...',
          lang,
        }),
      }),
    ],
    content,
    editable: !isReadOnly,
    onUpdate: ({ editor, transaction }) => {
      const content = editor.getHTML()
      console.log(editor, transaction)
      update({ content })
    },
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

        {editor && <MenuBar editor={editor} />}

        <EditorContent editor={editor} />
      </div>

      <style jsx>{editorStyles}</style>
      <style jsx>{styles}</style>
    </>
  )
}

export default ArticleEditor
