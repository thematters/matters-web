import { useLazyQuery } from '@apollo/react-hooks'
import { MattersArticleEditor } from '@matters/matters-editor'
import { FC, useContext } from 'react'

import { ADD_TOAST, ASSET_TYPE } from '~/common/enums'
import { LanguageContext } from '~/components'
import SEARCH_USERS from '~/components/GQL/queries/searchUsers'
import { EditorDraftFragment, SearchUsersQuery } from '~/gql/graphql'

import MentionUserList from '../MentionUserList'
import styles from './styles.module.css'

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

type SearchUsersSearchEdgesNodeUser = NonNullable<
  NonNullable<SearchUsersQuery['search']['edges']>[0]['node'] & {
    __typename: 'User'
  }
>

const ArticleEditor: FC<Props> = ({
  draft,

  isReviseMode = false,
  isSummaryReadOnly = false,
  isTitleReadOnly = false,

  update,
  upload,
}) => {
  const [search, searchResult] = useLazyQuery<SearchUsersQuery>(SEARCH_USERS)
  const { lang } = useContext(LanguageContext)

  const { id, content, publishState, summary, summaryCustomized, title } = draft
  const isPending = publishState === 'pending'
  const isPublished = publishState === 'published'
  const isReadOnly = (isPending || isPublished) && !isReviseMode
  const { data, loading } = searchResult

  const mentionUsers = (data?.search.edges || []).map(
    ({ node }: any) => node
  ) as SearchUsersSearchEdgesNodeUser[]

  const mentionKeywordChange = (keyword: string) => {
    search({ variables: { search: keyword, exclude: 'blocked' } })
  }

  return (
    <>
      <div className={styles['container']}>
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
    </>
  )
}

export default ArticleEditor
