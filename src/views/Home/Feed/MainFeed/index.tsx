import { useContext, useEffect, useRef } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestFeed,
  CardExposureTracker,
  EmptyArticle,
  InfiniteScroll,
  List,
  Media,
  QueryError,
  SpinnerBlock,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import {
  HottestFeedPublicQuery,
  IcymiFeedPublicQuery,
  NewestFeedPublicQuery,
} from '~/gql/graphql'

import Announcements from '../../Announcements'
import Authors from '../Authors'
import Billboard from '../Billboard'
import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC } from '../gql'
import { IcymiCuratedFeed } from '../IcymiCuratedFeed'
import { HomeFeedType } from '../SortBy'
import Tags from '../Tags'

type FeedArticlesPublic =
  | HottestFeedPublicQuery
  | NewestFeedPublicQuery
  | IcymiFeedPublicQuery

type HorizontalFeed = React.FC<{ after?: string; first?: number }>

interface HorizontalFeedEdge {
  __typename: 'HorizontalFeed'
  Feed: HorizontalFeed
}

type FeedEdge =
  | HorizontalFeedEdge
  | NonNullable<
      NonNullable<
        HottestFeedPublicQuery['viewer']
      >['recommendation']['feed']['edges']
    >[0]
  | NonNullable<
      NonNullable<
        IcymiFeedPublicQuery['viewer']
      >['recommendation']['feed']['edges']
    >[0]
  | NonNullable<
      NonNullable<
        NewestFeedPublicQuery['viewer']
      >['recommendation']['feed']['edges']
    >[0]

interface FeedLocation {
  [key: number]: HorizontalFeed
}

interface MainFeedProps {
  feedSortType: HomeFeedType
}

const horizontalFeeds: FeedLocation = {
  3: () => (
    <Media lessThan="lg">
      <Billboard />
    </Media>
  ),
  11: () => (
    <Media lessThan="lg">
      <Authors />
    </Media>
  ),
  17: () => (
    <Media lessThan="lg">
      <Tags />
    </Media>
  ),
}

const MainFeed = ({ feedSortType: sortBy }: MainFeedProps) => {
  const viewer = useContext(ViewerContext)
  const isHottestFeed = sortBy === 'hottest'
  const isIcymiFeed = sortBy === 'icymi'
  /**
   * Data Fetching
   */
  // public data
  const query = FEED_ARTICLES_PUBLIC[sortBy]
  const { data, error, loading, fetchMore, client } =
    usePublicQuery<FeedArticlesPublic>(query)

  // pagination
  const connectionPath = 'viewer.recommendation.feed'
  const recommendation = data?.viewer?.recommendation
  const result = recommendation?.feed
  const { edges, pageInfo } = result || {}

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
  const fetchedPrviateSortsRef = useRef<HomeFeedType[]>([])
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
    if (loading) {
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

  /**
   * Render
   */
  if (loading && !result) {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      document.body.focus()
    }
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
  }

  // insert other feeds
  let mixFeed: FeedEdge[] = edges

  if (isHottestFeed) {
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
    <>
      {recommendation &&
        'icymiTopic' in recommendation &&
        recommendation.icymiTopic && (
          <IcymiCuratedFeed recommendation={recommendation} />
        )}

      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        eof
      >
        <List>
          {isHottestFeed && <Announcements />}
          {mixFeed.map((edge, i) => {
            if (edge?.__typename === 'HorizontalFeed') {
              const { Feed } = edge
              return <Feed key={edge.__typename + i} />
            }
            const isFirstFold = i <= 3 // TODO: better guess'ing of first fold on different screens

            return (
              <List.Item key={`${sortBy}:${edge.node.id}`}>
                <ArticleDigestFeed
                  article={edge.node}
                  hasReadTime={true}
                  hasDonationCount={true}
                  includesMetaData={!isIcymiFeed} // only include metadata for non-icymi feeds
                  excludesTimeStamp={isIcymiFeed} // only exclude timestamp for icymi feed
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
                  isFirstFold={isFirstFold}
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
    </>
  )
}

export default MainFeed
