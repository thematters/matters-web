import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'

import {
  EmptyWarning,
  Head,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Translate,
} from '~/components'

import { analytics, mergeConnections } from '~/common/utils'

import { FOLLOWING_FEED } from './gql'
import UserAddArticleTagActivity from './UserAddArticleTagActivity'
import UserBookmarkArticleActivity from './UserBookmarkArticleActivity'
import UserBroadcastCircleActivity from './UserBroadcastCircleActivity'
import UserCollectArticleActivity from './UserCollectArticleActivity'
import UserCreateCircleActivity from './UserCreateCircleActivity'
import UserDonateArticleActivity from './UserDonateArticleActivity'
import UserFollowUserActivity from './UserFollowUserActivity'
import UserPublishArticleActivity from './UserPublishArticleActivity'
import UserSubscribeCircleActivity from './UserSubscribeCircleActivity'

import {
  FollowingFeed as FollowingFeedType,
  FollowingFeed_viewer_recommendation_following_edges,
} from './__generated__/FollowingFeed'

type FollowingEdge = FollowingFeed_viewer_recommendation_following_edges

const FollowingFeed = () => {
  const { data, loading, error, fetchMore, refetch } =
    useQuery<FollowingFeedType>(FOLLOWING_FEED)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.following'
  const { edges, pageInfo } = data?.viewer?.recommendation.following || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <Head title={{ id: 'follow' }} />

        <EmptyWarning
          description={
            <Translate
              zh_hant="還沒有動態"
              zh_hans="还没有动态"
              en="No activities."
            />
          }
        />
      </>
    )
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'follow',
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  // deduplicate edges with same `node.node`
  const dedupedNodeIds: string[] = []
  const dedupedEdges: FollowingEdge[] = []
  edges.forEach((edge) => {
    const { node } = edge
    const nodeId =
      _get(node, 'nodeArticle.id') ||
      _get(node, 'nodeComment.id') ||
      _get(node, 'nodeUser.id') ||
      _get(node, 'nodeCircle.id') ||
      ''
    const hasSameNode = dedupedNodeIds.indexOf(nodeId) >= 0

    if (!hasSameNode) {
      dedupedNodeIds.push(nodeId)
      dedupedEdges.push(edge)
    }
  })

  return (
    <>
      <Head title={{ id: 'follow' }} />

      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        pullToRefresh={refetch}
      >
        <List>
          {dedupedEdges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              {node.__typename === 'UserPublishArticleActivity' && (
                <UserPublishArticleActivity {...node} />
              )}
              {node.__typename === 'UserBroadcastCircleActivity' && (
                <UserBroadcastCircleActivity {...node} />
              )}
              {node.__typename === 'UserCreateCircleActivity' && (
                <UserCreateCircleActivity {...node} />
              )}
              {node.__typename === 'UserCollectArticleActivity' && (
                <UserCollectArticleActivity {...node} />
              )}
              {node.__typename === 'UserSubscribeCircleActivity' && (
                <UserSubscribeCircleActivity {...node} />
              )}
              {node.__typename === 'UserFollowUserActivity' && (
                <UserFollowUserActivity {...node} />
              )}
              {node.__typename === 'UserDonateArticleActivity' && (
                <UserDonateArticleActivity {...node} />
              )}
              {node.__typename === 'UserBookmarkArticleActivity' && (
                <UserBookmarkArticleActivity {...node} />
              )}
              {node.__typename === 'UserAddArticleTagActivity' && (
                <UserAddArticleTagActivity {...node} />
              )}
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default FollowingFeed
