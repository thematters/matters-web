import React, { useContext } from 'react'
import { useIntl } from 'react-intl'

import { analytics } from '~/common/utils'
import {
  ArticleDigestCurated,
  EmptyWork,
  Media,
  ViewerContext,
} from '~/components'
import { useRoute } from '~/components'
import { FeedArticlesPublicChannelQuery } from '~/gql/graphql'

import Authors from '../Authors'
import FeedRenderer from '../components/FeedRenderer'
import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC_CHANNEL } from '../gql'
import { useFeed } from '../hooks/useFeed'
import feedStyles from '../styles.module.css'
import Tags from '../Tags'
import { ChannelHeader } from './ChannelHeader'

const horizontalFeeds: Record<
  number,
  React.FC<{ after?: string; first?: number }>
> = {
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

const ChannelFeed = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')
  const feedType = 'channel'
  const numOfCards = 6

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

  const { data, loading, error, edges, pageInfo, loadMore, client } = useFeed({
    query: FEED_ARTICLES_PUBLIC_CHANNEL,
    variables: { shortHash },
    connectionPath: 'channel.feed',
    privateQueryFn: loadPrivate,
    keyPrefix: `channel:${shortHash}`,
  })

  let mixFeed = edges ? [...edges] : []

  if (mixFeed.length > 0) {
    mixFeed = JSON.parse(JSON.stringify(edges))

    const locs = Object.keys(horizontalFeeds).map((loc) => parseInt(loc, 10))
    locs.sort((a, b) => a - b)

    locs.forEach((loc) => {
      if (mixFeed.length >= loc) {
        mixFeed.splice(loc, 0, {
          Feed: horizontalFeeds[loc],
          __typename: 'HorizontalFeed',
        })
      }
    })
  }

  const renderCards = (
    cardEdges: any[],
    numOfCards: number,
    channelId?: string
  ) => {
    const onClick = (
      contentType: 'article' | 'user',
      location: number,
      id: string,
      rootId?: string,
      note?: Record<string, any>
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

    return (
      <section className={feedStyles.cards}>
        {cardEdges.slice(0, numOfCards).map((edge, i) => (
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
