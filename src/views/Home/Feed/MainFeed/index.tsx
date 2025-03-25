import { useApolloClient } from '@apollo/client'
import type { CSSProperties } from 'react'
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
  usePublicQuery,
  ViewerContext,
} from '~/components'
import {
  HottestFeedPublicQuery,
  IcymiFeedPublicQuery,
  NewestFeedPublicQuery,
  UserLanguage,
} from '~/gql/graphql'
import { ARTICLE_DETAIL_PUBLIC } from '~/views/ArticleDetail/gql'

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

  const PrefetchButton: React.FC<{ edges: FeedEdge[] }> = ({ edges }) => {
    const [prefetching, setPrefetching] = useState(false)
    const [progress, setProgress] = useState(0)
    const client = useApolloClient()

    const prefetchArticles = async () => {
      setPrefetching(true)
      setProgress(0)

      const articles = edges.filter(
        (edge): edge is Exclude<FeedEdge, HorizontalFeedEdge> =>
          edge.__typename !== 'HorizontalFeed'
      )
      const total = articles.length

      for (let i = 0; i < total; i++) {
        const edge = articles[i]
        if ('node' in edge) {
          await client.query({
            query: ARTICLE_DETAIL_PUBLIC,
            variables: {
              shortHash: edge.node.shortHash || '',
              language: UserLanguage.ZhHant,
            },
          })
        }
        setProgress(Math.round(((i + 1) / total) * 100))
      }

      setPrefetching(false)
    }

    const buttonStyle: CSSProperties = {
      position: 'fixed',
      right: '20px',
      bottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      background: 'white',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      zIndex: 1000,
    }

    const progressBarStyle: CSSProperties = {
      width: '120px',
      height: '4px',
      backgroundColor: '#f0f0f0',
      borderRadius: '2px',
      overflow: 'hidden',
    }

    const progressStyle: CSSProperties = {
      width: `${progress}%`,
      height: '100%',
      backgroundColor: '#1890ff',
      transition: 'width 0.2s ease',
    }

    return (
      <div style={buttonStyle}>
        <button
          onClick={prefetchArticles}
          disabled={prefetching}
          style={{
            padding: '4px 15px',
            fontSize: '14px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#1890ff',
            color: 'white',
            cursor: prefetching ? 'not-allowed' : 'pointer',
            opacity: prefetching ? 0.7 : 1,
          }}
        >
          {prefetching ? 'Prefetching...' : 'Prefetch Articles'}
        </button>
        {prefetching && (
          <div style={progressBarStyle}>
            <div style={progressStyle} />
          </div>
        )}
      </div>
    )
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
      <PrefetchButton edges={mixFeed} />
    </>
  )
}

export default MainFeed
