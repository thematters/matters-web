import React, { useContext, useEffect, useRef, useState } from 'react'
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

// Count color group distribution
function countColorDistribution(shortHashes: string[]) {
  // Initialize array for 36 color groups
  const colorGroups = Array(36).fill(0)

  shortHashes.forEach((hash) => {
    const groupIndex = getCoverHue(hash) // getCoverHue now returns group index directly
    colorGroups[groupIndex]++
  })

  return colorGroups
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
  const [showCharts, setShowCharts] = useState(true)

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

    const colorGroups = countColorDistribution(
      testArticles.map((article) => article.shortHash)
    )
    const maxValue = Math.max(...colorGroups)

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
      (availableWidth + spacing) / colorGroups.length - spacing
    )

    // Recalculate actual left margin to center the chart
    const actualWidth = (barWidth + spacing) * colorGroups.length - spacing
    margin.left = Math.floor((600 - actualWidth) / 2)

    const chartHeight = 200

    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0'
    ctx.beginPath()
    for (let i = 0; i <= 10; i++) {
      const y = margin.top + (chartHeight * i) / 10
      ctx.moveTo(margin.left, y)
      ctx.lineTo(margin.left + actualWidth, y)
    }
    ctx.stroke()

    colorGroups.forEach((count, index) => {
      // Calculate bar height and position
      const height = (count / maxValue) * chartHeight
      const x = margin.left + (barWidth + spacing) * index
      const y = margin.top + (chartHeight - height)

      // Use neutral color for bars
      const baseColor = '#4a90e2'
      ctx.fillStyle = baseColor

      // Draw bar
      ctx.fillRect(x, y, barWidth, height)

      // Add value labels for all bars
      ctx.fillStyle = '#333'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(count.toString(), x + barWidth / 2, y - 5)

      // Add group number labels
      ctx.save()
      ctx.translate(x + barWidth / 2, margin.top + chartHeight + 25)
      ctx.rotate(Math.PI / 4)
      ctx.fillText(`组 ${index}`, 0, 0)
      ctx.restore()
    })

    // Add title and axis labels
    ctx.fillStyle = '#333'
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('颜色组使用频率统计', 600 / 2, margin.top / 2)

    // Add y-axis labels
    ctx.textAlign = 'right'
    ctx.font = '10px Arial'
    for (let i = 0; i <= 10; i++) {
      const value = Math.round((maxValue * i) / 10)
      const y = margin.top + chartHeight - (chartHeight * i) / 10
      ctx.fillText(value.toString(), margin.left - 5, y + 3)
    }
  }, [testArticles])

  useEffect(() => {
    if (!circularChartRef.current) return

    const ctx = circularChartRef.current.getContext('2d')
    if (!ctx) return

    const colorGroups = countColorDistribution(
      testArticles.map((article) => article.shortHash)
    )
    const maxValue = Math.max(...colorGroups)

    // Clear canvas
    ctx.clearRect(0, 0, 600, 600)

    // Set chart dimensions
    const centerX = 300
    const centerY = 300
    const radius = 200
    const innerRadius = radius * 0.35
    const maxHeight = (radius - innerRadius) * 0.8

    // Draw base ring
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.arc(centerX, centerY, innerRadius, 2 * Math.PI, 0, true)
    ctx.fillStyle = '#f5f5f5'
    ctx.fill()

    // Draw each segment
    colorGroups.forEach((count, index) => {
      const angle = index * 10
      const startAngle = (angle - 90) * (Math.PI / 180)
      const endAngle = (angle + 10 - 90) * (Math.PI / 180)

      const height = count > 0 ? (count / maxValue) * maxHeight : 0
      const currentRadius = innerRadius + height

      // Draw segment
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius, startAngle, endAngle)
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
      ctx.closePath()

      // Use neutral color with varying opacity based on count
      const opacity = 0.3 + (count / maxValue) * 0.7
      ctx.fillStyle = `rgba(74, 144, 226, ${opacity})`
      ctx.fill()

      // Add border
      ctx.strokeStyle = 'rgba(74, 144, 226, 0.8)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Add value and group labels
      if (count > 0) {
        const labelAngle = (startAngle + endAngle) / 2
        const labelRadius = innerRadius + height / 2
        const x = centerX + labelRadius * Math.cos(labelAngle)
        const y = centerY + labelRadius * Math.sin(labelAngle)

        // Draw count
        ctx.fillStyle = '#333'
        ctx.font = 'bold 12px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(count.toString(), x, y)

        // Draw group number
        const groupLabelRadius = innerRadius - 15
        const groupX = centerX + groupLabelRadius * Math.cos(labelAngle)
        const groupY = centerY + groupLabelRadius * Math.sin(labelAngle)
        ctx.font = '10px Arial'
        ctx.fillText(`${index}`, groupX, groupY)
      }
    })

    // Add scale marks
    for (let i = 0; i < 36; i += 3) {
      const angle = (i * 10 - 90) * (Math.PI / 180)
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      // Draw scale line
      ctx.beginPath()
      ctx.moveTo(centerX + innerRadius * cos, centerY + innerRadius * sin)
      ctx.lineTo(centerX + (radius + 10) * cos, centerY + (radius + 10) * sin)
      ctx.strokeStyle = 'rgba(102, 102, 102, 0.3)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Add center text
    ctx.fillStyle = '#333'
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('颜色组使用频率统计', centerX, centerY - 10)
    ctx.font = '14px Arial'
    ctx.fillText(`共 ${testArticles.length} 篇文章`, centerX, centerY + 10)

    // Add legend
    const legendY = centerY + radius + 40
    ctx.font = '12px Arial'
    ctx.fillText('数字表示颜色组编号（0-35）', centerX, legendY)
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
    const allCardEdges = (() => {
      const combined = [...testArticles]
      console.log('Debug - Test Articles:', testArticles)
      console.log('Debug - Card Edges:', cardEdges)
      console.log('Debug - Combined Edges:', combined)
      return combined
    })()

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
      <div style={{ textAlign: 'right', padding: '10px 20px' }}>
        <button
          onClick={() => setShowCharts(!showCharts)}
          style={{
            position: 'fixed',
            top: '100px',
            left: '10px',
            padding: '8px 16px',
            backgroundColor: showCharts ? '#666' : '#f0f0f0',
            color: showCharts ? '#fff' : '#333',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {showCharts ? '隱藏色相分析' : '顯示色相分析'}
        </button>
      </div>

      {showCharts && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            margin: '0 20px 20px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <canvas
            ref={chartRef}
            width={600}
            height={300}
            style={{
              border: '1px solid #eee',
              borderRadius: '4px',
              backgroundColor: '#fff',
            }}
          />
          <canvas
            ref={circularChartRef}
            width={600}
            height={600}
            style={{
              border: '1px solid #eee',
              borderRadius: '4px',
              backgroundColor: '#fff',
            }}
          />
        </div>
      )}
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
