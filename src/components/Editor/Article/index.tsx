// import { useLazyQuery } from '@apollo/react-hooks'
// import { MattersArticleEditor } from '@matters/matters-editor'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  FC,
  // useContext
} from 'react'

import {
  // ADD_TOAST,
  ASSET_TYPE,
} from '~/common/enums'
import editorStyles from '~/common/styles/utils/content.article.css'
// import { LanguageContext } from '~/components'
// import SEARCH_USERS from '~/components/GQL/queries/searchUsers'
import {
  EditorDraftFragment,
  // SearchUsersQuery
} from '~/gql/graphql'

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

const ArticleEditor: FC<Props> = ({
  draft,

  isReviseMode = false,
  isSummaryReadOnly = false,
  isTitleReadOnly = false,

  update,
  upload,
}) => {
  // const [search, searchResult] = useLazyQuery<SearchUsersQuery>(SEARCH_USERS)
  // const { lang } = useContext(LanguageContext)

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
    extensions: [StarterKit],
    content,
    editable: isReadOnly,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
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

        <EditorContent editor={editor} />
      </div>

      <style jsx>{editorStyles}</style>
      <style jsx>{styles}</style>
    </>
  )
}

export default ArticleEditor
