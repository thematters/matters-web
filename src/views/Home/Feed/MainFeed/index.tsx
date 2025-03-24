import { NetworkStatus } from 'apollo-client'
import React, { useContext, useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestCurated,
  ArticleDigestFeed,
  ArticleFeedPlaceholder,
  CardExposureTracker,
  EmptyWork,
  InfiniteScroll,
  LanguageContext,
  List,
  Media,
  QueryError,
  Spacer,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { CHANNEL_BY_SHORT_HASH } from '~/components/GQL/queries/channels'
import {
  ChannelByShortHashQuery,
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
import { ChannelHeader } from './ChannelHeader'
import styles from './styles.module.css'

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

const MainFeed = ({}: MainFeedProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { getQuery, isInPath } = useRoute()
  const type = getQuery('type')
  const isInHome = isInPath('HOME')
  const isInChannel = isInPath('CHANNEL')
  const shortHash = getQuery('shortHash')
  const sortBy = isInChannel
    ? 'channel'
    : ((type === '' && isInHome ? 'icymi' : type) as HomeFeedType)
  const isIcymiFeed = sortBy === 'icymi'

  /**
   * Data Fetching
   */
  // public data
  const query = FEED_ARTICLES_PUBLIC[sortBy]
  const { data, error, loading, fetchMore, networkStatus, client } =
    usePublicQuery<FeedArticlesPublic>(query, {
      variables: isInChannel
        ? {
            shortHash,
          }
        : {},
    })

  // pagination
  const connectionPath = 'viewer.recommendation.feed'
  const recommendation = data?.viewer?.recommendation
  const result = recommendation?.feed
  const { edges, pageInfo } = result || {}
  const isNewLoading = networkStatus === NetworkStatus.loading

  const { data: channelData, loading: channelLoading } =
    usePublicQuery<ChannelByShortHashQuery>(CHANNEL_BY_SHORT_HASH, {
      variables: { shortHash, userLanguage: lang },
      skip: !shortHash || !isInChannel,
    })

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

  //FIXME: if the data has been updated, it will fetch the private data again
  // fetch private data for first page
  const fetchedPrviateSortsRef = useRef<string[]>([])
  useEffect(() => {
    const key = isInChannel ? `channel:${shortHash}` : sortBy
    const fetched = fetchedPrviateSortsRef.current.indexOf(key) >= 0
    if (loading || !edges || fetched || !viewer.isAuthed) {
      return
    }

    loadPrivate(data)
    fetchedPrviateSortsRef.current = [...fetchedPrviateSortsRef.current, key]
  }, [!!edges, loading, sortBy, viewer.id, shortHash, type])

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
  if (loading || channelLoading) {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      document.body.focus()
    }
    return (
      <>
        <ArticleFeedPlaceholder />
      </>
    )
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        {isInChannel && channelData && (
          <ChannelHeader channel={channelData.channel} />
        )}
        <EmptyWork
          description={
            <FormattedMessage defaultMessage="No articles" id="cHDJyK" />
          }
        />
      </>
    )
  }

  // insert other feeds
  let mixFeed: FeedEdge[] = edges

  if (isIcymiFeed) {
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

  const numOfCards = isInChannel ? 3 : 0

  return (
    <>
      {isIcymiFeed && (
        <section className={styles.header}>
          <h1>
            <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
          </h1>
          <Spacer size="sp20" />
        </section>
      )}
      {isIcymiFeed && <Announcements />}
      {recommendation &&
        'icymiTopic' in recommendation &&
        recommendation.icymiTopic && (
          <IcymiCuratedFeed recommendation={recommendation} />
        )}

      {isInChannel && channelData && (
        <ChannelHeader channel={channelData.channel} />
      )}

      {isInChannel && (
        <section className={styles.cards}>
          {mixFeed.slice(0, numOfCards).map((edge, i) => {
            if (edge.__typename === 'HorizontalFeed' || !('node' in edge)) {
              return null
            }

            return (
              <React.Fragment key={edge.node.id}>
                <Media at="xs">
                  <ArticleDigestCurated
                    article={edge.node}
                    titleLineClamp={3}
                  />
                </Media>
                <Media greaterThan="xs">
                  <ArticleDigestCurated
                    article={edge.node}
                    titleLineClamp={2}
                  />
                </Media>
              </React.Fragment>
            )
          })}
        </section>
      )}

      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        loader={<ArticleFeedPlaceholder count={3} />}
        eof
      >
        <List>
          {mixFeed.slice(numOfCards).map((edge, i) => {
            if (edge?.__typename === 'HorizontalFeed') {
              const { Feed } = edge
              return <Feed key={edge.__typename + i} />
            }
            const isFirstFold = i <= 3 // TODO: better guess'ing of first fold on different screens

            return (
              <List.Item key={`${sortBy}:${edge.node.id}`}>
                <ArticleDigestFeed
                  article={edge.node}
                  hasReadTime={false}
                  hasCircle={false}
                  hasDonationCount={false}
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
