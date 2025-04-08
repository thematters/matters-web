import React, { useContext, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestCurated,
  ArticleDigestFeed,
  ArticleFeedPlaceholder,
  CardExposureTracker,
  EmptyWork,
  InfiniteScroll,
  List,
  Media,
  QueryError,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { FeedArticlesPublicChannelQuery } from '~/gql/graphql'

import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC_CHANNEL } from '../gql'
import feedStyles from '../styles.module.css'
import { ChannelHeader } from './ChannelHeader'

const ChannelFeed = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const type = getQuery('type')
  const shortHash = getQuery('shortHash')
  /**
   * Data Fetching
   */
  // public data
  const query = FEED_ARTICLES_PUBLIC_CHANNEL
  const { data, error, loading, fetchMore, client } =
    usePublicQuery<FeedArticlesPublicChannelQuery>(query, {
      variables: {
        shortHash,
      },
    })

  // pagination
  const connectionPath = 'channel.feed'

  const channel = data?.channel
  const isTopicChannel = channel && channel.__typename === 'TopicChannel'
  const result = isTopicChannel ? channel.feed : undefined
  const { edges, pageInfo } = result || {}
  const feedType = 'channel'

  // private data
  const loadPrivate = (publicData?: FeedArticlesPublicChannelQuery) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const channel = publicData.channel
    if (!channel || channel.__typename !== 'TopicChannel') {
      return
    }

    const publiceEdges = channel.feed.edges || []
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
    const key = `channel:${shortHash}`
    const fetched = fetchedPrviateSortsRef.current.indexOf(key) >= 0
    if (loading || !edges || fetched || !viewer.isAuthed) {
      return
    }

    loadPrivate(data)
    fetchedPrviateSortsRef.current = [...fetchedPrviateSortsRef.current, key]
  }, [!!edges, loading, viewer.id, shortHash, type])

  // load next page
  const loadMore = async () => {
    if (loading) {
      return
    }

    analytics.trackEvent('load_more', {
      type: feedType,
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
  if (loading) {
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
        {data?.channel?.__typename === 'TopicChannel' && (
          <ChannelHeader channel={data.channel} />
        )}
        <EmptyWork
          description={intl.formatMessage({
            defaultMessage: 'No articles',
            id: 'cHDJyK',
          })}
        />
      </>
    )
  }
  const numOfCards = 6

  return (
    <>
      {data?.channel?.__typename === 'TopicChannel' && (
        <ChannelHeader channel={data.channel} />
      )}

      <section className={feedStyles.cards}>
        {edges.slice(0, numOfCards).map((edge, i) => {
          return (
            <React.Fragment key={edge.node.id}>
              <Media at="xs">
                <ArticleDigestCurated article={edge.node} titleLineClamp={3} />
              </Media>
              <Media greaterThan="xs">
                <ArticleDigestCurated article={edge.node} titleLineClamp={2} />
              </Media>
            </React.Fragment>
          )
        })}
      </section>

      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        loader={<ArticleFeedPlaceholder count={3} />}
        eof
      >
        <List>
          {edges.slice(numOfCards).map((edge, i) => {
            return (
              <List.Item key={`${edge.node.id}`}>
                <ArticleDigestFeed
                  article={edge.node}
                  hasReadTime={false}
                  hasCircle={false}
                  hasDonationCount={false}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: feedType,
                      contentType: 'article',
                      location: i,
                      id: edge.node.id,
                    })
                  }
                  onClickAuthor={() => {
                    analytics.trackEvent('click_feed', {
                      type: feedType,
                      contentType: 'user',
                      location: i,
                      id: edge.node.author.id,
                    })
                  }}
                />
                <CardExposureTracker
                  contentType="article"
                  feedType={feedType}
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

export default ChannelFeed
