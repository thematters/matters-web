import React from 'react'
import { useIntl } from 'react-intl'

import { analytics } from '~/common/utils'
import {
  ArticleDigestFeed,
  ArticleFeedPlaceholder,
  CardExposureTracker,
  EmptyWork,
  InfiniteScroll,
  List,
  QueryError,
} from '~/components'

import { FeedType } from '../index'

interface FeedRendererProps {
  loading: boolean
  error: any
  edges: any[] | undefined
  pageInfo: any
  loadMore: () => Promise<any>
  feedType: FeedType
  renderHeader?: () => React.ReactNode
  renderCards?: (
    edges: any[],
    numOfCards: number,
    channelId?: string
  ) => React.ReactNode
  emptyCustomOption?: React.ReactNode
  itemCustomProps?: Record<string, any>
  numOfCards?: number
  channelId?: string
}

const FeedRenderer: React.FC<FeedRendererProps> = ({
  loading,
  error,
  edges,
  pageInfo,
  loadMore,
  feedType,
  renderHeader,
  renderCards,
  emptyCustomOption,
  itemCustomProps = {},
  numOfCards = 0,
  channelId,
}) => {
  const intl = useIntl()

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
        {emptyCustomOption || (
          <EmptyWork
            description={intl.formatMessage({
              defaultMessage: 'No articles',
              id: 'cHDJyK',
            })}
          />
        )}
      </>
    )
  }

  const handleLoadMore = async () => {
    if (loading) return

    const result = await loadMore()

    if (result) {
      analytics.trackEvent('load_more', {
        type: feedType,
        location: result.count,
      })
    }
  }

  return (
    <>
      {renderHeader && renderHeader()}
      {renderCards && renderCards(edges, numOfCards, channelId)}

      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={handleLoadMore}
        loader={<ArticleFeedPlaceholder count={3} />}
        eof
      >
        <List>
          {edges.slice(numOfCards).map((edge, i) => {
            if (edge?.__typename === 'HorizontalFeed' && 'Feed' in edge) {
              const { Feed } = edge
              return <Feed key={`${edge.__typename}-${i}`} />
            }

            const isFirstFold = i <= 3

            return (
              <List.Item key={`${feedType}:${edge.node.id}`}>
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
                  isFirstFold={isFirstFold}
                  hasTogglePinChannelArticles={!!channelId}
                  channelId={channelId}
                  pinned={edge.pinned}
                  {...itemCustomProps}
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

export default FeedRenderer
