import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'

import {
  ArticleDigestFeed,
  EmptyArticle,
  InfiniteScroll,
  List,
  Spinner,
  useResponsive
} from '~/components'
import { QueryError } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import ArticleFeed from './Articles'
import SortBy from './SortBy'
import UserFeed from './Users'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import {
  HottestFeed,
  HottestFeed_viewer_recommendation_feed_edges
} from './__generated__/HottestFeed'
import {
  NewestFeed,
  NewestFeed_viewer_recommendation_feed_edges
} from './__generated__/NewestFeed'

type HorizontalFeed = React.FC<{ after?: string; first?: number }>

interface FeedEdge {
  __typename: 'HorizontalFeed'
  Feed: HorizontalFeed
}
interface FeedLocation {
  [key: number]: HorizontalFeed
}

const horizontalFeeds: FeedLocation = {
  2: () => <ArticleFeed type={'icymi'} first={3} />,
  5: () => <ArticleFeed type={'topics'} first={3} />,
  8: () => <UserFeed first={9} />
}

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

const MainFeed = ({ feedSortType: sortBy }: { feedSortType: SortBy }) => {
  const isLargeUp = useResponsive('lg-up')

  const {
    data,
    error,
    loading,
    fetchMore: fetchMoreMainFeed,
    networkStatus
  } = useQuery<HottestFeed | NewestFeed>(queries[sortBy], {
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
    return fetchMoreMainFeed({
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

  // insert other feeds
  let mixFeed: Array<
    | FeedEdge
    | HottestFeed_viewer_recommendation_feed_edges
    | NewestFeed_viewer_recommendation_feed_edges
  > = edges

  if (!isLargeUp) {
    // get copy
    mixFeed = JSON.parse(JSON.stringify(edges))
    // get insert entries
    const locs = Object.keys(horizontalFeeds).map(loc => parseInt(loc, 10))
    locs.sort((a, b) => a - b)

    // insert feed
    locs.map(loc => {
      if (mixFeed.length >= loc) {
        mixFeed.splice(loc, 0, {
          Feed: horizontalFeeds[loc],
          __typename: 'HorizontalFeed'
        })
      }
    })
  }

  return (
    <>
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List hasBorder>
          {mixFeed.map((edge, i) => {
            if (edge.__typename === 'HorizontalFeed') {
              const { Feed } = edge
              return <Feed key={i} />
            } else {
              return (
                <List.Item key={i}>
                  <ArticleDigestFeed
                    article={edge.node}
                    onClick={() =>
                      analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                        type: sortBy,
                        location: i
                      })
                    }
                  />
                </List.Item>
              )
            }
          })}
        </List>
      </InfiniteScroll>
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

      <MainFeed feedSortType={feedSortType as SortBy} />
    </>
  )
}

export default HomeFeed
