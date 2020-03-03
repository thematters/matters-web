import { QueryResult } from '@apollo/react-common'
import { QueryLazyOptions, useLazyQuery } from '@apollo/react-hooks'
import { MattersCommentEditor } from '@matters/matters-editor'
import { useContext, useState } from 'react'

import { LanguageContext } from '~/components'
import SEARCH_USERS from '~/components/GQL/queries/searchUsers'

import { ADD_TOAST } from '~/common/enums'
import editorStyles from '~/common/styles/utils/content.comment.css'
import themeStyles from '~/common/styles/vendors/quill.bubble.css'

import MentionUserList from '../MentionUserList'
import styles from './styles.css'

import {
  SearchUsers,
  SearchUsers_search_edges_node_User
} from '~/components/GQL/queries/__generated__/SearchUsers'

interface Props {
  content: string
  search: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void
  searchResult: QueryResult<SearchUsers, Record<string, any>>
  update: (params: { content: string }) => void
}

const CommentEditor: React.FC<Props> = ({
  content,
  search,
  searchResult,
  update
}) => {
  const { lang } = useContext(LanguageContext)
  const [mentionKeyword, setMentionKeyword] = useState<string>('')

  const { data, loading } = searchResult
  const mentionUsers = (data?.search.edges || []).map(
    ({ node }: any) => node
  ) as SearchUsers_search_edges_node_User[]

  const mentionKeywordChange = (keyword: string) => {
    if (mentionKeyword === keyword) {
      return
    }
    search({ variables: { search: keyword } })
    setMentionKeyword(keyword)
  }

  return (
    <>
      <section className="container">
        <MattersCommentEditor
          editorContent={content}
          editorUpdate={update}
          eventName={ADD_TOAST}
          language={lang.toUpperCase()}
          mentionLoading={loading}
          mentionKeywordChange={mentionKeywordChange}
          mentionUsers={mentionUsers}
          mentionListComponent={MentionUserList}
          readOnly={false}
          theme="bubble"
        />
      </section>

      <style jsx>{themeStyles}</style>
      <style jsx>{editorStyles}</style>
      <style jsx>{styles}</style>
    </>
  )
}

const CommentEditorWrap: React.FC<Omit<
  Props,
  'search' | 'searchResult'
>> = props => {
  const [search, searchResult] = useLazyQuery<SearchUsers>(SEARCH_USERS)

  return (
    <CommentEditor search={search} searchResult={searchResult} {...props} />
  )
}

export default CommentEditorWrap
