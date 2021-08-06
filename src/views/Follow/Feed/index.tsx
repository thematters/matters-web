import { useQuery } from '@apollo/react-hooks'
import _chunk from 'lodash/chunk'
import _flatten from 'lodash/flatten'
import _get from 'lodash/get'

import {
  EmptyWarning,
  Head,
  Help,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Translate,
} from '~/components'

import { analytics, mergeConnections } from '~/common/utils'

import { FOLLOWING_FEED } from './gql'
import RecommendArticleActivity from './RecommendArticleActivity'
import styles from './styles.css'
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
  FollowingFeed_viewer_recommendation_readTagsArticles_edges,
} from './__generated__/FollowingFeed'

const RECOMMEND_APPEND_EVERY = 3

type FollowingEdge = FollowingFeed_viewer_recommendation_following_edges
type RecommendEdge = FollowingFeed_viewer_recommendation_readTagsArticles_edges

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
  const recommendConnectionPath = 'viewer.recommendation.readTagsArticles'
  const { edges: recommendEdges, pageInfo: recommendPageInfo } =
    data?.viewer?.recommendation.readTagsArticles || {}

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

    const { hasNextPage: recommendHasNextPage, endCursor: recommendEndCursor } =
      recommendPageInfo || {}

    return fetchMore({
      variables: {
        followingAfter: pageInfo.endCursor,
        ...(recommendHasNextPage && recommendEndCursor
          ? { recommendAfter: recommendEndCursor }
          : {}),
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        let prevResult = previousResult
        if (recommendHasNextPage && recommendEndCursor) {
          prevResult = mergeConnections({
            oldData: prevResult,
            newData: fetchMoreResult,
            path: recommendConnectionPath,
          })
        }

        return mergeConnections({
          oldData: prevResult,
          newData: fetchMoreResult,
          path: connectionPath,
        })
      },
    })
  }

  // every 3 following activities append with 1 recommending article
  const mixEdges = _flatten(
    _chunk(edges, RECOMMEND_APPEND_EVERY).map((chunk, index) => {
      const recommendEdge = recommendEdges && recommendEdges[index]
      return chunk.length === RECOMMEND_APPEND_EVERY && recommendEdge
        ? [...chunk, recommendEdge]
        : chunk
    })
  )

  // deduplicate edges with same `node.node`
  const dedupedNodeIds: string[] = []
  const dedupedEdges: (FollowingEdge | RecommendEdge)[] = []
  mixEdges.forEach((edge) => {
    const { node } = edge
    const nodeId =
      _get(node, 'id') ||
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

      <section className="help">
        <Help hasTime />
      </section>

      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        pullToRefresh={refetch}
      >
        <List>
          {dedupedEdges.map(({ node, cursor }, i) => (
            <List.Item
              key={node.__typename + cursor}
              onClick={() => {
                analytics.trackEvent('click_feed', {
                  type: 'following',
                  contentType:
                    node.__typename === 'Article'
                      ? 'RecommendArticleActivity'
                      : node.__typename,
                  location: i,
                })
              }}
            >
              {node.__typename === 'Article' && (
                <RecommendArticleActivity article={node} />
              )}
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

      <style jsx>{styles}</style>
    </>
  )
}

export default FollowingFeed
