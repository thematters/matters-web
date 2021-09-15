import {
  ArticleTopicDigest,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Throw404,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
} from '~/components'

import { analytics, mergeConnections } from '~/common/utils'

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
    fetchMore,
    refetch: refetchPublic,
  } = usePublicQuery<UserTopicsPublic>(USER_TOPICS_PUBLIC, {
    variables: { userName },
  })

  // pagination
  const connectionPath = 'user.topics'
  const user = data?.user
  const { edges, pageInfo } = user?.topics || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user_topics',
      location: edges?.length || 0,
    })

    await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

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

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <Throw404 />
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List>
        {edges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <ArticleTopicDigest topic={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default UserTopics
