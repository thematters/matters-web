import React, { useContext, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyWork,
  Media,
  useFetchPolicy,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import { useRoute } from '~/components'
import { FeedArticlesPublicChannelQuery } from '~/gql/graphql'

import { MixedFeedArticleEdge, useMixedFeed } from '../../common'
import { ArticleDigestCurated } from '../ArticleDigestCurated'
import { ChannelHeader } from '../ChannelHeader'
import FeedRenderer from '../FeedRenderer'
import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC_CHANNEL } from '../gql'
import feedStyles from '../styles.module.css'

const ChannelFeed = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')
  const feedType = 'channel'

  const { fetchPolicy } = useFetchPolicy()

  const { data, error, loading, fetchMore, client } =
    usePublicQuery<FeedArticlesPublicChannelQuery>(
      FEED_ARTICLES_PUBLIC_CHANNEL,
      { fetchPolicy, variables: { shortHash } }
    )

  const connectionPath = 'channel.articles'
  const { edges, pageInfo } =
    data?.channel?.__typename === 'CurationChannel' ||
    data?.channel?.__typename === 'TopicChannel'
      ? data?.channel?.articles
      : {}
  const fetchedPrivateSortsRef = useRef<string[]>([])

  const isCurationChannel = data?.channel?.__typename === 'CurationChannel'
  const numOfCards = isCurationChannel ? 3 : 6

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

  const renderCards = ({
    loading,
    edges,
    numOfCards,
    channelId,
  }: {
    loading?: boolean
    edges?: MixedFeedArticleEdge[]
    numOfCards?: number
    channelId?: string
  }) => {
    if (loading) {
      return (
        <section className={feedStyles.cards}>
          <ArticleDigestCurated.Placeholder />
          <ArticleDigestCurated.Placeholder />
          <ArticleDigestCurated.Placeholder />
        </section>
      )
    }

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

    const filteredEdges = edges
      ?.filter((edge) => edge.__typename === 'ChannelArticleEdge')
      .slice(0, numOfCards)

    const renderArticleDigest = (
      edge: Extract<MixedFeedArticleEdge, { __typename: 'ChannelArticleEdge' }>,
      index: number,
      titleLineClamp: 2 | 3
    ) => (
      <ArticleDigestCurated
        article={edge.node}
        titleLineClamp={titleLineClamp}
        pinned={edge.pinned}
        channelId={channelId}
        onClick={() =>
          onClick('article', index, edge.node.id, channelId, {
            pinned: edge.pinned,
          })
        }
        onClickAuthor={() =>
          onClick('user', index, edge.node.author.id, channelId, {
            pinned: edge.pinned,
          })
        }
      />
    )

    return (
      <section className={feedStyles.cards}>
        {filteredEdges?.map((edge, i) => (
          <React.Fragment key={edge.node.id}>
            <Media at="xs">{renderArticleDigest(edge, i, 3)}</Media>
            <Media greaterThan="xs">{renderArticleDigest(edge, i, 2)}</Media>
          </React.Fragment>
        ))}
      </section>
    )
  }

  const renderHeader = ({ loading }: { loading?: boolean }) => {
    if (loading) {
      return <ChannelHeader.Placeholder />
    }

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
