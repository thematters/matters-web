import React, { useContext } from 'react'
import { useIntl } from 'react-intl'

import {
  ArticleDigestCurated,
  EmptyWork,
  Media,
  ViewerContext,
} from '~/components'
import { useRoute } from '~/components'
import { FeedArticlesPublicChannelQuery } from '~/gql/graphql'

import FeedRenderer from '../components/FeedRenderer'
import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC_CHANNEL } from '../gql'
import { useFeed } from '../hooks/useFeed'
import feedStyles from '../styles.module.css'
import { ChannelHeader } from './ChannelHeader'

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

  const renderCards = (cardEdges: any[], numOfCards: number) => {
    return (
      <section className={feedStyles.cards}>
        {cardEdges.slice(0, numOfCards).map((edge, i) => (
          <React.Fragment key={edge.node.id}>
            <Media at="xs">
              <ArticleDigestCurated article={edge.node} titleLineClamp={3} />
            </Media>
            <Media greaterThan="xs">
              <ArticleDigestCurated article={edge.node} titleLineClamp={2} />
            </Media>
          </React.Fragment>
        ))}
      </section>
    )
  }

  const renderHeader = () => {
    if (!data?.channel || data.channel.__typename !== 'TopicChannel') {
      return null
    }

    return <ChannelHeader channel={data.channel} />
  }

  const emptyCustomOption =
    data?.channel?.__typename === 'TopicChannel' ? (
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
      edges={edges}
      pageInfo={pageInfo}
      loadMore={loadMore}
      feedType={feedType}
      renderHeader={renderHeader}
      renderCards={renderCards}
      emptyCustomOption={emptyCustomOption}
      numOfCards={numOfCards}
    />
  )
}

export default ChannelFeed
