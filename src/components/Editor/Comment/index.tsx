import { useLazyQuery } from '@apollo/react-hooks'
import { MattersCommentEditor } from '@matters/matters-editor'
import { useContext } from 'react'

import { LanguageContext } from '~/components'
import SEARCH_USERS from '~/components/GQL/queries/searchUsers'

import { ADD_TOAST } from '~/common/enums'
import editorStyles from '~/common/styles/utils/content.comment.css'
import themeStyles from '~/common/styles/vendors/quill.bubble.css'

import MentionUserList from '../MentionUserList'

import {
  SearchUsers,
  SearchUsers_search_edges_node_User
} from '~/components/GQL/queries/__generated__/SearchUsers'

interface Props {
  content: string
  update: (params: { content: string }) => void
}

const CommentEditor: React.FC<Props> = ({ content, update }) => {
  const [search, { data, loading }] = useLazyQuery<SearchUsers>(SEARCH_USERS)
  const { lang } = useContext(LanguageContext)

  const mentionUsers = (data?.search.edges || []).map(
    ({ node }: any) => node
  ) as SearchUsers_search_edges_node_User[]

  const mentionKeywordChange = (keyword: string) => {
    search({ variables: { search: keyword } })
  }

  return (
    <>
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

      <style jsx>{themeStyles}</style>
      <style jsx>{editorStyles}</style>
    </>
  )
}

export default CommentEditor
