import { NetworkStatus } from 'apollo-client'
import { useContext, useEffect, useRef, useState } from 'react'

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
  useNativeEventListener,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import {
  HottestFeedPublicQuery,
  IcymiFeedPublicQuery,
  NewestFeedPublicQuery,
} from '~/gql/graphql'

import Announcements from '../../Announcements'
import DropdownDialog from '../../Channel/DropdownDialog'
import ChannelCarousel from '../../Channel/Page/Carousel'
import SingleLine from '../../Channel/SingleLine'
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

  const host = typeof window !== 'undefined' ? window.location.origin : ''

  const items = [
    {
      id: '1',
      title: '精選',
      link: `${host}/#channel=1`,
    },
    {
      id: '2',
      title: '時事話題',
      link: `${host}/#channel=2`,
    },
    {
      id: '3',
      title: '思想歷史',
      link: `${host}/#channel=3`,
    },
    {
      id: '4',
      title: '文化藝術',
      link: `${host}/#channel=4`,
    },
    {
      id: '5',
      title: '科技',
      link: `${host}/#channel=5`,
    },
    {
      id: '6',
      title: '經濟財經',
      link: `${host}/#channel=6`,
    },
    {
      id: '7',
      title: '政治',
      link: `${host}/#channel=7`,
    },
    {
      id: '8',
      title: '社會',
      link: `${host}/#channel=8`,
    },
    {
      id: '9',
      title: '國際',
      link: `${host}/#channel=9`,
    },
    {
      id: '10',
      title: '宗教',
      link: `${host}/#channel=10`,
    },
    {
      id: '11',
      title: '教育',
      link: `${host}/#channel=11`,
    },
    {
      id: '12',
      title: '法律',
      link: `${host}/#channel=12`,
    },
    {
      id: '13',
      title: '健康',
      link: `${host}/#channel=13`,
    },
    {
      id: '14',
      title: '運動',
      link: `${host}/#channel=14`,
    },
    {
      id: '15',
      title: '旅遊',
      link: `${host}/#channel=15`,
    },
    {
      id: '16',
      title: '娛樂',
      link: `${host}/#channel=16`,
    },
    {
      id: '17',
      title: '美食',
      link: `${host}/#channel=17`,
    },
    {
      id: '18',
      title: '旅居探索群',
      link: `${host}/#channel=18`,
    },
    {
      id: '19',
      title: '旅居探索分享',
      link: `${host}/#channel=19`,
    },
    {
      id: '20',
      title: '旅居探索',
      link: `${host}/#channel=20`,
    },
    {
      id: '21',
      title: 'Channel 21',
      link: `${host}/#channel=21`,
    },
    {
      id: '22',
      title: 'Channel 22',
      link: `${host}/#channel=22`,
    },
    {
      id: '23',
      title: 'Channel 23',
      link: `${host}/#channel=23`,
    },
    {
      id: '24',
      title: 'Channel 24',
      link: `${host}/#channel=24`,
    },
    {
      id: '25',
      title: 'Channel 25',
      link: `${host}/#channel=25`,
    },
    {
      id: '26',
      title: 'Channel 26',
      link: `${host}/#channel=26`,
    },
    {
      id: '27',
      title: 'Channel 27',
      link: `${host}/#channel=27`,
    },
    {
      id: '28',
      title: 'Channel 28',
      link: `${host}/#channel=28`,
    },
  ]

  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  useEffect(() => {
    if (showDropdown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showDropdown])

  const [showSingleLine, setShowSingleLine] = useState(false)

  useNativeEventListener('scroll', () => {
    if (window.scrollY > 85) {
      setShowSingleLine(true)
    } else {
      setShowSingleLine(false)
    }
  })

  /**
   * Data Fetching
   */
  // public data
  const query = FEED_ARTICLES_PUBLIC[sortBy]
  const { data, error, loading, fetchMore, networkStatus, client } =
    usePublicQuery<FeedArticlesPublic>(query, {
      notifyOnNetworkStatusChange: true,
    })

  // pagination
  const connectionPath = 'viewer.recommendation.feed'
  const recommendation = data?.viewer?.recommendation
  const result = recommendation?.feed
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

  /**
   * Render
   */
  if (loading && (!result || isNewLoading)) {
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
          <Media lessThan="lg">
            <ChannelCarousel items={items} />
            {showSingleLine && (
              <SingleLine items={items} toggleDropdown={toggleDropdown} />
            )}
            {showDropdown && (
              <DropdownDialog items={items} toggleDropdown={toggleDropdown} />
            )}
          </Media>
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
