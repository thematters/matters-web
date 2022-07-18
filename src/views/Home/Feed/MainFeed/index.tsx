import { NetworkStatus } from 'apollo-client'
import { useContext, useEffect, useRef } from 'react'

import {
  ArticleDigestFeed,
  CardExposureTracker,
  EmptyArticle,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  usePublicQuery,
  useResponsive,
  ViewerContext,
} from '~/components'

import { analytics, mergeConnections } from '~/common/utils'

import Authors from '../Authors'
import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC } from '../gql'
import { SortByType } from '../SortBy'
import Tags from '../Tags'

import {
  HottestFeedPublic,
  HottestFeedPublic_viewer_recommendation_feed_edges,
} from '../__generated__/HottestFeedPublic'
import {
  IcymiFeedPublic,
  IcymiFeedPublic_viewer_recommendation_feed_edges,
} from '../__generated__/IcymiFeedPublic'
import {
  NewestFeedPublic,
  NewestFeedPublic_viewer_recommendation_feed_edges,
} from '../__generated__/NewestFeedPublic'

type FeedArticlesPublic = HottestFeedPublic | NewestFeedPublic | IcymiFeedPublic

type HorizontalFeed = React.FC<{ after?: string; first?: number }>

interface HorizontalFeedEdge {
  __typename: 'HorizontalFeed'
  Feed: HorizontalFeed
}

type FeedEdge =
  | HorizontalFeedEdge
  | HottestFeedPublic_viewer_recommendation_feed_edges
  | IcymiFeedPublic_viewer_recommendation_feed_edges
  | NewestFeedPublic_viewer_recommendation_feed_edges

interface FeedLocation {
  [key: number]: HorizontalFeed
}

interface MainFeedProps {
  feedSortType: SortByType
}

const horizontalFeeds: FeedLocation = {
  2: () => <Tags />,
  5: () => <Authors />,
}

const MainFeed = ({ feedSortType: sortBy }: MainFeedProps) => {
  const viewer = useContext(ViewerContext)
  const isLargeUp = useResponsive('lg-up')
  const isHottestFeed = sortBy === 'hottest'

  /**
   * Data Fetching
   */
  // public data
  const query = FEED_ARTICLES_PUBLIC[sortBy]
  const {
    data,
    error,
    loading,
    fetchMore,
    networkStatus,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<FeedArticlesPublic>(query, {
    notifyOnNetworkStatusChange: true,
  })

  // pagination
  const connectionPath = 'viewer.recommendation.feed'
  const result = data?.viewer?.recommendation.feed
  const { edges, pageInfo } = result || {}
  const isNewLoading = networkStatus === NetworkStatus.loading

  // private data
  const loadPrivate = (publicData?: FeedArticlesPublic) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges = publicData.viewer?.recommendation?.feed.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: FEED_ARTICLES_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  const fetchedPrviateSortsRef = useRef<SortByType[]>([])
  useEffect(() => {
    const fetched = fetchedPrviateSortsRef.current.indexOf(sortBy) >= 0
    if (loading || !edges || fetched || !viewer.isAuthed) {
      return
    }

    loadPrivate(data)
    fetchedPrviateSortsRef.current = [...fetchedPrviateSortsRef.current, sortBy]
  }, [!!edges, loading, sortBy, viewer.id])

  // load next page
  const loadMore = async () => {
    if (loading || isNewLoading) {
      return
    }

    analytics.trackEvent('load_more', {
      type: sortBy,
      location: edges?.length || 0,
    })

    const { data: newData } = await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true,
        }),
    })

    loadPrivate(newData)
  }

  // refetch & pull to refresh
  const refetch = async () => {
    const { data: newData } = await refetchPublic()
    loadPrivate(newData)
  }

  /**
   * Render
   */
  if (loading && (!result || isNewLoading)) {
    if (process.browser) {
      window.scrollTo(0, 0)
      document.body.focus()
    }
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
  }

  // insert other feeds
  let mixFeed: FeedEdge[] = edges

  if (!isLargeUp && isHottestFeed) {
    // get copy
    mixFeed = JSON.parse(JSON.stringify(edges))

    // get insert entries
    const locs = Object.keys(horizontalFeeds).map((loc) => parseInt(loc, 10))
    locs.sort((a, b) => a - b)

    // insert feed
    locs.map((loc) => {
      if (mixFeed.length >= loc) {
        mixFeed.splice(loc, 0, {
          Feed: horizontalFeeds[loc],
          __typename: 'HorizontalFeed',
        })
      }
    })
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {mixFeed.map((edge, i) => {
          if (edge.__typename === 'HorizontalFeed') {
            const { Feed } = edge
            return <Feed key={edge.__typename + i} />
          }

          return (
            <List.Item key={`${sortBy}:${edge.node.id}`}>
              <ArticleDigestFeed
                article={edge.node}
                utm_source="homepage"
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: sortBy,
                    contentType: 'article',
                    location: i,
                    id: edge.node.id,
                  })
                }
                onClickAuthor={() => {
                  analytics.trackEvent('click_feed', {
                    type: sortBy,
                    contentType: 'user',
                    location: i,
                    id: edge.node.author.id,
                  })
                }}
              />
              <CardExposureTracker
                contentType="article"
                feedType={sortBy}
                location={i}
                id={edge.node.id}
              />
            </List.Item>
          )
        })}
      </List>
    </InfiniteScroll>
  )
}

export default MainFeed
