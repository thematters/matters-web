import {
  CircleDigest,
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
} from '~/components'

import { analytics, mergeConnections } from '~/common/utils'

import { USER_FOLLOWING_CIRCLES_PUBLIC } from './gql'

import { UserFollowingCirclesPublic } from './__generated__/UserFollowingCirclesPublic'

const CirclesFeed = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, refetch } =
    usePublicQuery<UserFollowingCirclesPublic>(USER_FOLLOWING_CIRCLES_PUBLIC, {
      variables: { userName },
    })

  // pagination
  const user = data?.user
  const connectionPath = 'user.following.circles'
  const { edges, pageInfo } = user?.following?.circles || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user_circle',
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

  if (
    !user ||
    user?.status?.state === 'archived' ||
    !edges ||
    edges.length <= 0 ||
    !pageInfo
  ) {
    return (
      <EmptyWarning
        description={
          <Translate
            zh_hant="還沒有追蹤任何圍爐"
            zh_hans="还没有追踪任何围炉"
            en="Not following any circle"
          />
        }
      />
    )
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder={false}>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <CircleDigest.Mini
              circle={node}
              spacing={['base', 'tight']}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'user_circle',
                  contentType: 'circle',
                  location: i,
                  id: node.id,
                })
              }
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default CirclesFeed
