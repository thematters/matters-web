import { useQuery } from '@apollo/react-hooks'
import _chunk from 'lodash/chunk'
import _flatten from 'lodash/flatten'
import _get from 'lodash/get'
import { useIntl } from 'react-intl'

import { analytics, mergeConnections, shouldRenderNode } from '~/common/utils'
import {
  EmptyWarning,
  Head,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  Translate,
} from '~/components'
import { FollowingFeedQuery } from '~/gql/graphql'

import { FOLLOWING_FEED } from './gql'
import RecommendArticleActivity from './RecommendArticleActivity'
import RecommendUserActivity from './RecommendUserActivity'
import UserAddArticleTagActivity from './UserAddArticleTagActivity'
import UserBroadcastCircleActivity from './UserBroadcastCircleActivity'
import UserCreateCircleActivity from './UserCreateCircleActivity'
import UserPublishArticleActivity from './UserPublishArticleActivity'

const renderableTypes = new Set([
  'UserPublishArticleActivity',
  'UserBroadcastCircleActivity',
  'UserCreateCircleActivity',
  'UserAddArticleTagActivity',
  'ArticleRecommendationActivity',
  'UserRecommendationActivity',
])

const FollowingFeed = () => {
  const intl = useIntl()
  const { data, loading, error, fetchMore } =
    useQuery<FollowingFeedQuery>(FOLLOWING_FEED)

  if (loading) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.following'
  const { edges, pageInfo } = data?.viewer?.recommendation.following || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <Head
          title={intl.formatMessage({ defaultMessage: 'Follow', id: 'ieGrWo' })}
        />

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
      <Head
        title={intl.formatMessage({ defaultMessage: 'Follow', id: 'ieGrWo' })}
      />
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        eof
      >
        <List>
          {edges.map(({ node }, i) => {
            return shouldRenderNode(node, renderableTypes) ? (
              <List.Item key={`${node.__typename}:${i}`}>
                {node.__typename === 'UserPublishArticleActivity' && (
                  <UserPublishArticleActivity location={i} {...node} />
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
