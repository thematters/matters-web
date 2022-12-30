import { useLazyQuery } from '@apollo/react-hooks'
import { MattersArticleEditor } from '@matters/matters-editor'
import { FC, useContext } from 'react'

import { ADD_TOAST, ASSET_TYPE } from '~/common/enums'
import editorStyles from '~/common/styles/utils/content.article.css'
import themeStyles from '~/common/styles/vendors/quill.bubble.css'
import { LanguageContext } from '~/components'
import {
  SearchUsers,
  SearchUsers_search_edges_node_User,
} from '~/components/GQL/queries/__generated__/SearchUsers'
import SEARCH_USERS from '~/components/GQL/queries/searchUsers'

import { EditorDraft } from '../__generated__/EditorDraft'
import MentionUserList from '../MentionUserList'
import styles from './styles.css'

interface Props {
  draft: EditorDraft

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

const ArticleEditor: FC<Props> = ({
  draft,

  isReviseMode = false,
  isSummaryReadOnly = false,
  isTitleReadOnly = false,

  update,
  upload,
}) => {
  const [search, searchResult] = useLazyQuery<SearchUsers>(SEARCH_USERS)
  const { lang } = useContext(LanguageContext)

  const { id, content, publishState, summary, summaryCustomized, title } = draft
  const isPending = publishState === 'pending'
  const isPublished = publishState === 'published'
  const isReadOnly = (isPending || isPublished) && !isReviseMode
  const { data, loading } = searchResult

  const mentionUsers = (data?.search.edges || []).map(
    ({ node }: any) => node
  ) as SearchUsers_search_edges_node_User[]

  const mentionKeywordChange = (keyword: string) => {
    search({ variables: { search: keyword, exclude: 'blocked' } })
  }

  return (
    <>
      <div className="container">
        <MattersArticleEditor
          editorContent={content || ''}
          editorContentId={id}
          editorUpdate={update}
          editorUpload={upload}
          enableReviseMode={isReviseMode}
          enableSummary
          enableToolbar={!isReviseMode}
          eventName={ADD_TOAST}
          language={lang}
          mentionLoading={loading}
          mentionKeywordChange={mentionKeywordChange}
          mentionUsers={mentionUsers}
          mentionListComponent={MentionUserList}
          readOnly={isReadOnly}
          summaryDefaultValue={summaryCustomized && summary ? summary : ''}
          summaryReadOnly={isSummaryReadOnly}
          theme="bubble"
          titleDefaultValue={title || ''}
          titleReadOnly={isTitleReadOnly}
        />
      </div>
      <style jsx>{themeStyles}</style>
      <style jsx>{editorStyles}</style>
      <style jsx>{styles}</style>
    </>
  )
}

export default ArticleEditor
