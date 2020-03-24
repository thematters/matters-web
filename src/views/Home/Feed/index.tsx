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

import Articles from './Articles'
import Authors from './Authors'
import SortBy from './SortBy'
import styles from './styles.css'
import Tags from './Tags'
import ViewMode from './ViewMode'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import {
  HottestFeed,
  HottestFeed_viewer_recommendation_feed_edges
} from './__generated__/HottestFeed'
import {
  NewestFeed,
  NewestFeed_viewer_recommendation_feed_edges
} from './__generated__/NewestFeed'

type SortBy = 'hottest' | 'newest'

type HorizontalFeed = React.FC<{ after?: string; first?: number }>

interface FeedEdge {
  __typename: 'HorizontalFeed'
  Feed: HorizontalFeed
}

interface FeedLocation {
  [key: number]: HorizontalFeed
}

const horizontalFeeds: FeedLocation = {
  2: () => <Articles type="icymi" />,
  5: () => <Articles type="topics" />,
  8: () => <Tags />,
  11: () => <Authors />
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

const MainFeed = ({ feedSortType: sortBy }: { feedSortType: SortBy }) => {
  const isLargeUp = useResponsive('lg-up')
  const isHottestFeed = sortBy === 'hottest'
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
      // previousResult could be undefined when scrolling before loading finishes, reason unknown
      updateQuery: (previousResult, { fetchMoreResult }) =>
        previousResult
          ? mergeConnections({
              oldData: previousResult,
              newData: fetchMoreResult,
              path: connectionPath,
              dedupe: true
            })
          : fetchMoreResult
    })
  }

  // insert other feeds
  let mixFeed: Array<
    | FeedEdge
    | HottestFeed_viewer_recommendation_feed_edges
    | NewestFeed_viewer_recommendation_feed_edges
  > = edges

  if (!isLargeUp && isHottestFeed) {
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
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List>
        {mixFeed.map((edge, i) => {
          if (edge.__typename === 'HorizontalFeed') {
            const { Feed } = edge
            return <Feed key={edge.__typename} />
          } else {
            return (
              <List.Item key={edge.node.id}>
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
      <section className="topbar">
        <SortBy sortBy={feedSortType as SortBy} setSortBy={setSortBy} />
        <ViewMode />
      </section>

      <MainFeed feedSortType={feedSortType as SortBy} />

      <style jsx>{styles}</style>
    </>
  )
}

export default HomeFeed
