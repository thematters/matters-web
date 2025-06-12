import { analytics, mergeConnections } from '~/common/utils'
import {
  CircleDigest,
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  Translate,
  usePublicQuery,
  useRoute,
} from '~/components'
import { UserFollowingCirclesPublicQuery } from '~/gql/graphql'

import { USER_FOLLOWING_CIRCLES_PUBLIC } from './gql'

const FollowingFeed = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore } =
    usePublicQuery<UserFollowingCirclesPublicQuery>(
      USER_FOLLOWING_CIRCLES_PUBLIC,
      {
        variables: { userName },
      }
    )

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

  /**
   * Render
   */
  if (loading) {
    return <SpinnerBlock />
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
            zh_hans="还没有关注任何围炉"
            en="Not following any circle"
          />
        }
      />
    )
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder={false}>
        {edges.map(({ node }, i) => (
          <List.Item key={node.id}>
            <CircleDigest.Mini
              circle={node}
              spacing={[12, 16]}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'user_circle',
                  contentType: 'circle',
                  location: i,
                  id: node.id,
                })
              }
              bgActiveColor="none"
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default FollowingFeed
