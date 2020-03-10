import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'

import {
  ArticleDigestFeed,
  EmptyArticle,
  InfiniteScroll,
  List,
  Spinner,
  useResponsive,
  ViewMoreButton
} from '~/components'
import { QueryError } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import SortBy from './SortBy'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { HottestFeed } from './__generated__/HottestFeed'
import { NewestFeed } from './__generated__/NewestFeed'

const feedFragment = gql`
  fragment FeedArticleConnection on ArticleConnection {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        ...ArticleDigestFeedArticle
      }
    }
  }
  ${ArticleDigestFeed.fragments.article}
`

export const queries = {
  hottest: gql`
    query HottestFeed($after: String) {
      viewer {
        id
        recommendation {
          feed: hottest(input: { first: 10, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `,
  newest: gql`
    query NewestFeed($after: String) {
      viewer {
        id
        recommendation {
          feed: newest(input: { first: 10, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `
}

type SortBy = 'hottest' | 'newest'

const Feed = ({ feedSortType: sortBy }: { feedSortType: SortBy }) => {
  const isLargeUp = useResponsive('lg-up')
  const { data, error, loading, fetchMore, networkStatus } = useQuery<
    HottestFeed | NewestFeed
  >(queries[sortBy], {
    notifyOnNetworkStatusChange: true
  })

  const connectionPath = 'viewer.recommendation.feed'
  const result = data?.viewer?.recommendation.feed
  const { edges, pageInfo } = result || {}
  const isNewLoading = networkStatus === NetworkStatus.loading

  if (loading && (!result || isNewLoading)) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: sortBy,
      location: edges.length
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true
        })
    })
  }

  return (
    <>
      <InfiniteScroll
        hasNextPage={isLargeUp && pageInfo.hasNextPage}
        loadMore={loadMore}
      >
        <List hasBorder>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <ArticleDigestFeed
                article={node}
                onClick={() =>
                  analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                    type: sortBy,
                    location: i
                  })
                }
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>

      {!isLargeUp && pageInfo.hasNextPage && (
        <ViewMoreButton onClick={loadMore} loading={loading} />
      )}
    </>
  )
}

const HomeFeed = () => {
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' }
  })
  const { feedSortType } = data?.clientPreference || {
    feedSortType: 'hottest'
  }
  const setSortBy = (type: SortBy) => {
    if (client) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { feedSortType: type }
      })
    }
  }

  return (
    <>
      <SortBy sortBy={feedSortType as SortBy} setSortBy={setSortBy} />

      <Feed feedSortType={feedSortType as SortBy} />
    </>
  )
}

export default HomeFeed
