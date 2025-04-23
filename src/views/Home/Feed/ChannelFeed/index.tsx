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
  const isThinkChannel = shortHash === 'wfeuf91m01ay'
  const feedType = 'channel'
  const numOfCards = 360
  const chartRef = useRef<HTMLCanvasElement>(null)
  const circularChartRef = useRef<HTMLCanvasElement>(null)

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

  useEffect(() => {
    if (!circularChartRef.current) return

    const ctx = circularChartRef.current.getContext('2d')
    if (!ctx) return

    const hueGroups = countHueDistribution(
      testArticles.map((article) => article.shortHash)
    )
    const maxValue = Math.max(...hueGroups)

    // Clear canvas
    ctx.clearRect(0, 0, 600, 600)

    // Set chart dimensions
    const centerX = 300
    const centerY = 300
    const radius = 200
    const innerRadius = radius * 0.35 // 縮小內圈以留出更多空間顯示高度
    const maxHeight = (radius - innerRadius) * 0.8 // 最大高度

    // 清空畫布
    ctx.clearRect(0, 0, 600, 600)

    // 先畫底部圓環（淺灰色）
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.arc(centerX, centerY, innerRadius, 2 * Math.PI, 0, true)
    ctx.fillStyle = '#f5f5f5'
    ctx.fill()

    // 計算並繪製每個色相區段
    hueGroups.forEach((count, index) => {
      const hue = index * 10
      const startAngle = (hue - 90) * (Math.PI / 180)
      const endAngle = (hue + 10 - 90) * (Math.PI / 180)

      // 計算高度（基於數值）
      const height = count > 0 ? (count / maxValue) * maxHeight : 0
      const currentRadius = innerRadius + height

      // 繪製扇形
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius, startAngle, endAngle)
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
      ctx.closePath()

      // 使用實際的色相值，並調整透明度
      ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.8)`
      ctx.fill()

      // 添加邊框以增強立體感
      ctx.strokeStyle = `hsla(${hue}, 70%, 40%, 0.6)`
      ctx.lineWidth = 1
      ctx.stroke()

      // 如果數值較大，添加數值標籤
      if (count > maxValue * 0.1) {
        const labelAngle = (startAngle + endAngle) / 2
        const labelRadius = innerRadius + height / 2
        const x = centerX + labelRadius * Math.cos(labelAngle)
        const y = centerY + labelRadius * Math.sin(labelAngle)

        ctx.fillStyle = '#fff'
        ctx.font = 'bold 12px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(count.toString(), x, y)
      }
    })

    // 添加刻度標記
    for (let i = 0; i < 360; i += 30) {
      const angle = (i - 90) * (Math.PI / 180)
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      // 畫刻度線
      ctx.beginPath()
      ctx.moveTo(centerX + innerRadius * cos, centerY + innerRadius * sin)
      ctx.lineTo(centerX + (radius + 10) * cos, centerY + (radius + 10) * sin)
      ctx.strokeStyle = 'rgba(102, 102, 102, 0.5)'
      ctx.lineWidth = 1
      ctx.stroke()

      // 添加角度標籤
      const labelRadius = radius + 25
      const x = centerX + labelRadius * cos
      const y = centerY + labelRadius * sin

      ctx.fillStyle = '#666'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${i}°`, x, y)
    }

    // 添加中心文字
    ctx.fillStyle = '#333'
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('色相分布統計', centerX, centerY - 10)
    ctx.font = '14px Arial'
    ctx.fillText(`共 ${testArticles.length} 篇文章`, centerX, centerY + 10)
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
                hue={isThinkChannel ? i + 1 : undefined}
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
                hue={isThinkChannel ? i + 1 : undefined}
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
      <canvas
        ref={circularChartRef}
        width={600}
        height={600}
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
