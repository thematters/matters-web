import { useQuery } from '@apollo/client'
import { FormattedMessage } from 'react-intl'

import { analytics, mergeConnections, shouldRenderNode } from '~/common/utils'
import {
  ArticleFeedPlaceholder,
  EmptyWork,
  InfiniteScroll,
  List,
  QueryError,
} from '~/components'
import {
  FollowingFeedQuery,
  RecommendationFollowingFilterType,
} from '~/gql/graphql'

import { TABS } from '../Tabs'
import { FOLLOWING_FEED } from './gql'
import RecommendArticleActivity from './RecommendArticleActivity'
import RecommendUserActivity from './RecommendUserActivity'
import UserAddArticleTagActivity from './UserAddArticleTagActivity'
import UserBroadcastCircleActivity from './UserBroadcastCircleActivity'
import UserCreateCircleActivity from './UserCreateCircleActivity'
import UserPostMomentActivity from './UserPostMomentActivity'
import UserPublishArticleActivity from './UserPublishArticleActivity'

type FollowingFeedProps = {
  tab: TABS
}

const renderableTypes = new Set([
  'UserPublishArticleActivity',
  'UserPostMomentActivity',
  'UserBroadcastCircleActivity',
  'UserCreateCircleActivity',
  'UserAddArticleTagActivity',
  'ArticleRecommendationActivity',
  'UserRecommendationActivity',
])

const getNodeId = (
  node: {
    __typename: string
    nodeArticle?: { id: string } | null
    nodeMoment?: { id: string } | null
    targetCircle?: { id: string } | null
    nodeCircle?: { id: string } | null
    actor?: { id: string } | null
    targetTag?: { id: string } | null
    source?: string | null
  },
  cursor: string
): string => {
  if (!node) return cursor

  switch (node.__typename) {
    case 'UserPublishArticleActivity':
      return node.nodeArticle?.id || cursor
    case 'UserPostMomentActivity':
      return node.nodeMoment?.id || cursor
    case 'UserBroadcastCircleActivity':
      return node.targetCircle?.id || cursor
    case 'UserCreateCircleActivity':
      return node.nodeCircle?.id || cursor
    case 'UserAddArticleTagActivity':
      return `${node.actor?.id || ''}:${node.targetTag?.id || ''}` || cursor
    case 'ArticleRecommendationActivity':
      return node.source || cursor
    case 'UserRecommendationActivity':
      return cursor
    default:
      return cursor
  }
}

const FollowingFeed = ({ tab }: FollowingFeedProps) => {
  const isArticleTab = tab === 'Article'
  const { data, loading, error, fetchMore } = useQuery<FollowingFeedQuery>(
    FOLLOWING_FEED,
    {
      variables: isArticleTab
        ? { type: RecommendationFollowingFilterType.Article }
        : {},
    }
  )

  if (loading) {
    return <ArticleFeedPlaceholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.following'
  const { edges, pageInfo } = data?.viewer?.recommendation.following || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <EmptyWork
          description={
            <FormattedMessage defaultMessage="No updates yet" id="+EHtpH" />
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
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        })
      },
    })
  }

  return (
    <>
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        loader={<ArticleFeedPlaceholder count={3} />}
        eof
      >
        <List>
          {edges.map(({ node, cursor }, i) => {
            const uniqueKey = `${node.__typename}:${getNodeId(
              node,
              cursor
            )}:${i}`

            return shouldRenderNode(node, renderableTypes) ? (
              <List.Item key={uniqueKey}>
                {node.__typename === 'UserPublishArticleActivity' && (
                  <UserPublishArticleActivity location={i} {...node} />
                )}
                {node.__typename === 'UserPostMomentActivity' && (
                  <UserPostMomentActivity location={i} {...node} />
                )}
                {node.__typename === 'UserBroadcastCircleActivity' && (
                  <UserBroadcastCircleActivity {...node} />
                )}
                {node.__typename === 'UserCreateCircleActivity' && (
                  <UserCreateCircleActivity location={i} {...node} />
                )}
                {node.__typename === 'UserAddArticleTagActivity' && (
                  <UserAddArticleTagActivity location={i} {...node} />
                )}
                {node.__typename === 'ArticleRecommendationActivity' && (
                  <RecommendArticleActivity
                    location={i}
                    articles={node.recommendArticles}
                    source={node.source}
                  />
                )}
                {node.__typename === 'UserRecommendationActivity' && (
                  <RecommendUserActivity users={node.recommendUsers} />
                )}
              </List.Item>
            ) : null
          })}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default FollowingFeed
