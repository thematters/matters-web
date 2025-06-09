import React, { useContext, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import { EmptyWork, Media, usePublicQuery, ViewerContext } from '~/components'
import { useRoute } from '~/components'
import { FeedArticlesPublicChannelQuery } from '~/gql/graphql'

import { MixedFeedArticleEdge, useMixedFeed } from '../../common'
import FeedRenderer from '../FeedRenderer'
import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC_CHANNEL } from '../gql'
import { ArticleDigestCurated } from '../IcymiCuratedFeed/ArticleDigestCurated'
import feedStyles from '../styles.module.css'
import { ChannelHeader } from './ChannelHeader'

type ChannelFeedProps = {
  shortHash: string
}

const ChannelFeed = ({ shortHash: _shortHash }: ChannelFeedProps) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const shortHash = _shortHash || getQuery('shortHash')
  const feedType = 'channel'
  const numOfCards = 6

  const { data, error, loading, fetchMore, client } =
    usePublicQuery<FeedArticlesPublicChannelQuery>(
      FEED_ARTICLES_PUBLIC_CHANNEL,
      { variables: { shortHash } }
    )

  const connectionPath = 'channel.articles'
  const { edges, pageInfo } =
    data?.channel?.__typename === 'CurationChannel' ||
    data?.channel?.__typename === 'TopicChannel'
      ? data?.channel?.articles
      : {}
  const fetchedPrivateSortsRef = useRef<string[]>([])

  const loadPrivate = (publicData?: FeedArticlesPublicChannelQuery) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const channel = publicData.channel
    if (!channel || channel.__typename !== 'TopicChannel') {
      return
    }

    const publiceEdges = channel.articles.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: FEED_ARTICLES_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    const fetched = fetchedPrivateSortsRef.current.indexOf(shortHash) >= 0
    if (loading || !edges || fetched || !viewer.isAuthed) {
      return
    }

    loadPrivate(data)
    fetchedPrivateSortsRef.current = [
      ...fetchedPrivateSortsRef.current,
      shortHash,
    ]
  }, [!!edges, loading, viewer.id, shortHash])

  const loadMore = async () => {
    if (loading) {
      return
    }

    const { data: newData } = await fetchMore({
      variables: {
        shortHash,
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
    return { newData, count: edges?.length || 0 }
  }

  const mixFeed = useMixedFeed(edges || [], true, feedType)

  const renderCards = (
    cardEdges: MixedFeedArticleEdge[],
    numOfCards: number,
    channelId?: string
  ) => {
    const onClick = (
      contentType: 'article' | 'user',
      location: number,
      id: string,
      rootId?: string,
      note?: Record<string, unknown>
    ) => {
      analytics.trackEvent('click_feed', {
        type: 'channel_card',
        contentType,
        location,
        id,
        rootId,
        note,
      })
    }

    const edges = cardEdges
      ?.filter((edge) => edge.__typename === 'ChannelArticleEdge')
      .slice(0, numOfCards)

    return (
      <section className={feedStyles.cards}>
        {edges.map((edge, i) => (
          <React.Fragment key={edge.node.id}>
            <Media at="xs">
              <ArticleDigestCurated
                article={edge.node}
                titleLineClamp={3}
                pinned={edge.pinned}
                channelId={channelId}
                onClick={() =>
                  onClick('article', i, edge.node.id, channelId, {
                    pinned: edge.pinned,
                  })
                }
                onClickAuthor={() =>
                  onClick('user', i, edge.node.author.id, channelId, {
                    pinned: edge.pinned,
                  })
                }
              />
            </Media>
            <Media greaterThan="xs">
              <ArticleDigestCurated
                article={edge.node}
                titleLineClamp={2}
                pinned={edge.pinned}
                channelId={channelId}
                onClick={() =>
                  onClick('article', i, edge.node.id, channelId, {
                    pinned: edge.pinned,
                  })
                }
                onClickAuthor={() =>
                  onClick('user', i, edge.node.author.id, channelId, {
                    pinned: edge.pinned,
                  })
                }
              />
            </Media>
          </React.Fragment>
        ))}
      </section>
    )
  }

  const renderHeader = () => {
    if (
      !data?.channel ||
      (data.channel.__typename !== 'TopicChannel' &&
        data.channel.__typename !== 'CurationChannel')
    ) {
      return null
    }

    return <ChannelHeader channel={data.channel} />
  }

  const emptyCustomOption =
    data?.channel?.__typename === 'TopicChannel' ||
    data?.channel?.__typename === 'CurationChannel' ? (
      <>
        <ChannelHeader channel={data.channel} />
        <EmptyWork
          description={intl.formatMessage({
            defaultMessage: 'No articles',
            id: 'cHDJyK',
          })}
        />
      </>
    ) : null

  return (
    <FeedRenderer
      loading={loading}
      error={error}
      edges={mixFeed}
      pageInfo={pageInfo}
      loadMore={loadMore}
      feedType={feedType}
      renderHeader={renderHeader}
      renderCards={renderCards}
      emptyCustomOption={emptyCustomOption}
      numOfCards={numOfCards}
      channelId={data?.channel?.id}
    />
  )
}

export default ChannelFeed
