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
import { UserSubscriptionsQuery } from '~/gql/graphql'

import { USER_SUBSCRIPTIONS } from './gql'

const SubscribedFeed = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore } =
    usePublicQuery<UserSubscriptionsQuery>(USER_SUBSCRIPTIONS, {
      variables: { userName },
    })

  // pagination
  const user = data?.user
  const connectionPath = 'user.subscribedCircles'
  const { edges, pageInfo } = user?.subscribedCircles || {}

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
            zh_hant="還沒有訂閱任何圍爐"
            zh_hans="还没有订阅任何围炉"
            en="Not subscribing any circle"
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

export default SubscribedFeed
