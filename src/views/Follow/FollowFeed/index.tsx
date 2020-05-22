import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ArticleDigestFeed,
  EmptyArticle,
  Head,
  InfiniteScroll,
  List,
  Spinner,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, mergeConnections } from '~/common/utils'

import FollowComment from './FollowComment'

import { FollowFeed as FollowFeedType } from './__generated__/FollowFeed'

const FOLLOW_FEED = gql`
  query FollowFeed($after: String) {
    viewer {
      id
      recommendation {
        followeeWorks(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              __typename
              ... on Article {
                ...ArticleDigestFeedArticle
              }
              ... on Comment {
                ...FollowComment
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article}
  ${FollowComment.fragments.comment}
`

const FollowFeed = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery<FollowFeedType>(
    FOLLOW_FEED
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.followeeWorks'
  const { edges, pageInfo } = data?.viewer?.recommendation.followeeWorks || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
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
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            {node.__typename === 'Article' && (
              <ArticleDigestFeed
                article={node}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'follow',
                    contentType: 'article',
                    styleType: 'no_cover',
                    location: i,
                  })
                }
                inFollowFeed
              />
            )}
            {node.__typename === 'Comment' && (
              <FollowComment
                comment={node}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'follow',
                    contentType: 'article',
                    styleType: 'comment',
                    location: i,
                  })
                }
              />
            )}
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default () => (
  <>
    <Head title={{ id: 'follow' }} />
    <FollowFeed />
  </>
)
