import {
  ArticleTopicDigest,
  List,
  QueryError,
  Spinner,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
} from '~/components'

import { USER_TOPICS_PUBLIC } from './gql'

import { UserTopicsPublic } from './__generated__/UserTopicsPublic'

const UserTopics = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    error,
    refetch: refetchPublic,
  } = usePublicQuery<UserTopicsPublic>(USER_TOPICS_PUBLIC, {
    variables: { userName },
  })

  const user = data?.user

  // refetch & pull to refresh
  const refetch = async () => {
    await refetchPublic()
  }
  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <List>
      {user?.topics.map((topic, i) =>
        topic ? (
          <List.Item key={i}>
            <ArticleTopicDigest topic={topic} />
          </List.Item>
        ) : null
      )}
    </List>
  )
}

export default UserTopics
