import { useLazyQuery } from '@apollo/react-hooks'
import { MattersCommentEditor } from '@matters/matters-editor'
import { useContext } from 'react'

import { ADD_TOAST } from '~/common/enums'
import editorStyles from '~/common/styles/utils/content.comment.css'
import themeStyles from '~/common/styles/vendors/quill.bubble.css'
import { LanguageContext } from '~/components'
import {
  SearchUsers,
  SearchUsers_search_edges_node_User,
} from '~/components/GQL/queries/__generated__/SearchUsers'
import SEARCH_USERS from '~/components/GQL/queries/searchUsers'

import MentionUserList from '../MentionUserList'

interface Props {
  content: string
  update: (params: { content: string }) => void
  placeholder?: string
}

const CommentEditor: React.FC<Props> = ({ content, update, placeholder }) => {
  const [search, { data, loading }] = useLazyQuery<SearchUsers>(SEARCH_USERS)
  const { lang } = useContext(LanguageContext)

  const mentionUsers = (data?.search.edges || []).map(
    ({ node }: any) => node
  ) as SearchUsers_search_edges_node_User[]

  const mentionKeywordChange = (keyword: string) => {
    search({ variables: { search: keyword, exclude: 'blocked' } })
  }

  return (
    <>
      <MattersCommentEditor
        editorContent={content}
        editorUpdate={update}
        eventName={ADD_TOAST}
        language={lang}
        mentionLoading={loading}
        mentionKeywordChange={mentionKeywordChange}
        mentionUsers={mentionUsers}
        mentionListComponent={MentionUserList}
        readOnly={false}
        theme="bubble"
        texts={placeholder ? { COMMENT_PLACEHOLDER: placeholder } : {}}
      />

      <style jsx>{themeStyles}</style>
      <style jsx>{editorStyles}</style>
    </>
  )
}

export default CommentEditor
