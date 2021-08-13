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
import RecommendCircleActivity from './RecommendCircleActivity'
import RecommendUserActivity from './RecommendUserActivity'
import styles from './styles.css'
import UserAddArticleTagActivity from './UserAddArticleTagActivity'
import UserBroadcastCircleActivity from './UserBroadcastCircleActivity'
import UserCreateCircleActivity from './UserCreateCircleActivity'
import UserPublishArticleActivity from './UserPublishArticleActivity'

import { FollowingFeed as FollowingFeedType } from './__generated__/FollowingFeed'

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
          {edges.map(({ node, cursor }, i) => (
            <List.Item
              key={node.__typename + cursor}
              onClick={() => {
                analytics.trackEvent('click_feed', {
                  type: 'following',
                  contentType: node.__typename,
                  location: i,
                })
              }}
            >
              {node.__typename === 'UserPublishArticleActivity' && (
                <UserPublishArticleActivity {...node} />
              )}
              {node.__typename === 'UserBroadcastCircleActivity' && (
                <UserBroadcastCircleActivity {...node} />
              )}
              {node.__typename === 'UserCreateCircleActivity' && (
                <UserCreateCircleActivity {...node} />
              )}
              {node.__typename === 'UserAddArticleTagActivity' && (
                <UserAddArticleTagActivity {...node} />
              )}
              {node.__typename === 'ArticleRecommendationActivity' && (
                <RecommendArticleActivity
                  articles={node.recommendArticles}
                  source={node.source}
                />
              )}
              {node.__typename === 'CircleRecommendationActivity' && (
                <RecommendCircleActivity circles={node.recommendCircles} />
              )}
              {node.__typename === 'UserRecommendationActivity' && (
                <RecommendUserActivity users={node.recommendUsers} />
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
