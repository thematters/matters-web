import { useQuery } from '@apollo/react-hooks'
import _chunk from 'lodash/chunk'
import _flatten from 'lodash/flatten'
import _get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'

import { analytics, mergeConnections, shouldRenderNode } from '~/common/utils'
import {
  ArticleFeedPlaceholder,
  EmptyWork,
  Head,
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

const FollowingFeed = ({ tab }: FollowingFeedProps) => {
  const intl = useIntl()
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
        <Head
          title={intl.formatMessage({ defaultMessage: 'Follow', id: 'ieGrWo' })}
        />

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
      <Head
        title={intl.formatMessage({ defaultMessage: 'Follow', id: 'ieGrWo' })}
      />
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        loader={<ArticleFeedPlaceholder count={3} />}
        eof
      >
        <List>
          {edges.map(({ node }, i) => {
            return shouldRenderNode(node, renderableTypes) ? (
              <List.Item key={`${node.__typename}:${i}`}>
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
