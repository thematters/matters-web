import React, { useContext, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { analytics } from '~/common/utils'
import {
  ArticleDigestCurated,
  EmptyWork,
  Media,
  ViewerContext,
} from '~/components'
import { useRoute } from '~/components'
import { getCoverHue } from '~/components/ArticleDigest/Curated/CoverIcon'
import {
  ArticleDigestCuratedArticleFragment,
  FeedArticlesPublicChannelQuery,
} from '~/gql/graphql'
import { MOCK_ARTILCE } from '~/stories/mocks'

import FeedRenderer from '../components/FeedRenderer'
import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC_CHANNEL } from '../gql'
import { useFeed } from '../hooks/useFeed'
import feedStyles from '../styles.module.css'
import { ChannelHeader } from './ChannelHeader'

// 生成随机字符串
function generateRandomString(length = 12) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

// Count hue distribution for color analysis
function countHueDistribution(shortHashes: string[]) {
  // Divide 360 degrees into 36 groups, 10 degrees each
  const hueGroups = Array(36).fill(0)

  shortHashes.forEach((hash) => {
    const hue = getCoverHue(hash)
    const groupIndex = Math.floor(hue / 10)
    hueGroups[groupIndex]++
  })

  return hueGroups
}

const ChannelFeed = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')
  const feedType = 'channel'
  const numOfCards = 360
  const chartRef = useRef<HTMLCanvasElement>(null)

  // Generate test articles data
  const testArticles = Array.from({ length: numOfCards }, (_, i) => {
    const id = `QXJ0aWNsZToke(i + 1)}`
    const shortHash = generateRandomString()
    const title = shortHash

    return {
      ...MOCK_ARTILCE,
      id,
      shortHash,
      title,
      cover: null,
      assets: null,
    }
  }) as unknown as ArticleDigestCuratedArticleFragment[]

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const hueGroups = countHueDistribution(
      testArticles.map((article) => article.shortHash)
    )
    const maxValue = Math.max(...hueGroups)

    // Clear canvas
    ctx.clearRect(0, 0, 600, 300)

    // Set margins and chart dimensions
    const margin = {
      top: 40,
      right: 25,
      bottom: 70,
      left: 25,
    }

    // Calculate available width
    const availableWidth = 600 - margin.left - margin.right

    // Calculate optimal bar width and spacing
    const spacing = 2
    const barWidth = Math.floor(
      (availableWidth + spacing) / hueGroups.length - spacing
    )

    // Recalculate actual left margin to center the chart
    const actualWidth = (barWidth + spacing) * hueGroups.length - spacing
    margin.left = Math.floor((600 - actualWidth) / 2)

    const chartHeight = 200

    hueGroups.forEach((count, index) => {
      // Calculate bar height and position
      const height = (count / maxValue) * chartHeight
      const x = margin.left + (barWidth + spacing) * index
      const y = margin.top + (chartHeight - height)

      // Use actual hue value for bar color
      const hue = index * 10
      ctx.fillStyle = `hsl(${hue}, 70%, 50%)`

      // Draw bar
      ctx.fillRect(x, y, barWidth, height)

      // Add value labels (every 3rd bar)
      if (index % 3 === 0) {
        ctx.fillStyle = '#000'
        ctx.font = '10px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(count.toString(), x + barWidth / 2, y - 5)
      }

      // Add hue labels (every 3rd bar)
      if (index % 3 === 0) {
        ctx.save()
        ctx.translate(x + barWidth / 2, margin.top + chartHeight + 25)
        ctx.rotate(Math.PI / 4)
        ctx.fillText(`${hue}°`, 0, 0)
        ctx.restore()
      }
    })

    // Add title
    ctx.fillStyle = '#000'
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(
      'Hue Value Distribution (10° per group)',
      600 / 2,
      margin.top / 2
    )
  }, [testArticles])

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

  const renderCards = (
    cardEdges: (ArticleDigestCuratedArticleFragment & { pinned?: boolean })[],
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

    // 在开发环境下添加测试文章并打印调试信息
    const allCardEdges =
      process.env.NODE_ENV === 'development'
        ? (() => {
            const combined = [...testArticles]
            console.log('Debug - Test Articles:', testArticles)
            console.log('Debug - Card Edges:', cardEdges)
            console.log('Debug - Combined Edges:', combined)
            return combined
          })()
        : cardEdges

    return (
      <section className={feedStyles.cards}>
        {allCardEdges.slice(0, numOfCards).map((edge, i) => (
          <React.Fragment key={edge.id}>
            <Media at="xs">
              <ArticleDigestCurated
                article={edge}
                titleLineClamp={3}
                pinned={edge.pinned}
                channelId={channelId}
                onClick={() =>
                  onClick('article', i, edge.id, channelId, {
                    pinned: edge.pinned,
                  })
                }
                onClickAuthor={() =>
                  onClick('user', i, edge.author.id, channelId, {
                    pinned: edge.pinned,
                  })
                }
              />
            </Media>
            <Media greaterThan="xs">
              <ArticleDigestCurated
                article={edge}
                titleLineClamp={2}
                pinned={edge.pinned}
                channelId={channelId}
                onClick={() =>
                  onClick('article', i, edge.id, channelId, {
                    pinned: edge.pinned,
                  })
                }
                onClickAuthor={() =>
                  onClick('user', i, edge.author.id, channelId, {
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
    <>
      <canvas
        ref={chartRef}
        width={600}
        height={300}
        style={{
          border: '1px solid #ccc',
          margin: '20px',
          backgroundColor: '#fff',
        }}
      />
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
        channelId={data?.channel?.id}
      />
    </>
  )
}

export default ChannelFeed
