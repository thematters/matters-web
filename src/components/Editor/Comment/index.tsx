import { useLazyQuery } from '@apollo/react-hooks'
import { MattersCommentEditor } from '@matters/matters-editor'
import { useContext } from 'react'

import { ADD_TOAST } from '~/common/enums'
import { LanguageContext } from '~/components'
import SEARCH_USERS from '~/components/GQL/queries/searchUsers'
import { SearchUsersQuery } from '~/gql/graphql'

import MentionUserList from '../MentionUserList'

interface Props {
  content: string
  update: (params: { content: string }) => void
  placeholder?: string
}

type SearchUsersSearchEdgesNodeUser = NonNullable<
  NonNullable<SearchUsersQuery['search']['edges']>[0]
>['node']

const CommentEditor: React.FC<Props> = ({ content, update, placeholder }) => {
  const [search, { data, loading }] =
    useLazyQuery<SearchUsersQuery>(SEARCH_USERS)
  const { lang } = useContext(LanguageContext)

  const mentionUsers = (data?.search.edges || []).map(
    ({ node }) => node
  ) as SearchUsersSearchEdgesNodeUser[]

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
    </>
  )
}

export default CommentEditor
