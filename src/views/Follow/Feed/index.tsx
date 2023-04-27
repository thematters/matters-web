import { useQuery } from '@apollo/react-hooks'
import _chunk from 'lodash/chunk'
import _flatten from 'lodash/flatten'
import _get from 'lodash/get'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyWarning,
  Head,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Translate,
} from '~/components'
import { FollowingFeedQuery } from '~/gql/graphql'

import { FOLLOWING_FEED } from './gql'
import RecommendArticleActivity from './RecommendArticleActivity'
import RecommendCircleActivity from './RecommendCircleActivity'
import RecommendUserActivity from './RecommendUserActivity'
import styles from './styles.css'
import UserAddArticleTagActivity from './UserAddArticleTagActivity'
import UserBroadcastCircleActivity from './UserBroadcastCircleActivity'
import UserCreateCircleActivity from './UserCreateCircleActivity'
import UserPublishArticleActivity from './UserPublishArticleActivity'

const FollowingFeed = () => {
  const { data, loading, error, fetchMore } =
    useQuery<FollowingFeedQuery>(FOLLOWING_FEED)

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

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List responsiveWrapper>
          {edges.map(({ node }, i) => {
            if (node.__typename === 'ArticleRecommendationActivity') {
              return (
                <section key={`${node.__typename}:${i}`}>
                  <RecommendArticleActivity
                    location={i}
                    articles={node.recommendArticles}
                    source={node.source}
                  />
                </section>
              )
            }

            if (node.__typename === 'CircleRecommendationActivity') {
              return (
                <section key={`${node.__typename}:${i}`}>
                  <RecommendCircleActivity
                    location={i}
                    circles={node.recommendCircles}
                  />
                </section>
              )
            }

            if (node.__typename === 'UserRecommendationActivity') {
              return (
                <section key={`${node.__typename}:${i}`}>
                  <RecommendUserActivity users={node.recommendUsers} />
                </section>
              )
            }
            return (
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
              </List.Item>
            )
          })}
        </List>
      </InfiniteScroll>

      <style jsx>{styles}</style>
    </>
  )
}

export default FollowingFeed
