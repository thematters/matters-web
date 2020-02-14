import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import _get from 'lodash/get'

import {
  ArticleDigestFeed,
  InfiniteScroll,
  List,
  LoadMore,
  Spinner
} from '~/components'
import EmptyTagArticles from '~/components/Empty/EmptyTagArticles'
import { QueryError } from '~/components/GQL'
import TAG_ARTICLES from '~/components/GQL/queries/tagArticles'
import { useEventListener, useResponsive } from '~/components/Hook'

import {
  ANALYTICS_EVENTS,
  FEED_TYPE,
  REFETCH_TAG_DETAIL_ARTICLES
} from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import {
  TagArticles,
  TagArticles_node_Tag_articles
} from '~/components/GQL/queries/__generated__/TagArticles'

const LatestArticles = ({ id }: { id: string }) => {
  const isMediumUp = useResponsive({ type: 'md-up' })()
  const { data, loading, error, fetchMore, refetch, networkStatus } = useQuery<
    TagArticles
  >(TAG_ARTICLES, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  })

  const connectionPath = 'node.articles'
  const articles = _get(data, connectionPath) as TagArticles_node_Tag_articles
  const { edges, pageInfo } = articles || { edges: [], pageInfo: {} }
  const isNewLoading = networkStatus === NetworkStatus.loading
  const hasArticles = edges && edges.length > 0 && pageInfo

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.TAG_DETAIL,
      location: edges ? edges.length : 0,
      entrance: id
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })
  }

  const sync = ({
    event,
    differences = 0
  }: {
    event: 'add' | 'delete'
    differences?: number
  }) => {
    const { edges: items } = _get(data, connectionPath, { edges: [] })
    switch (event) {
      case 'add':
        refetch({
          variables: {
            id,
            first: items.length + differences
          }
        })
        break
      case 'delete':
        refetch({
          variables: {
            id,
            first: Math.max(items.length - 1, 0)
          }
        })
        break
    }
  }

  useEventListener(REFETCH_TAG_DETAIL_ARTICLES, sync)

  if (loading && (!articles || isNewLoading)) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return <EmptyTagArticles />
  }

  if (!hasArticles) {
    return <EmptyTagArticles />
  }

  return (
    <section>
      <InfiniteScroll
        hasNextPage={isMediumUp && pageInfo.hasNextPage}
        loadMore={loadMore}
      >
        <List hasBorder>
          {(edges || []).map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <ArticleDigestFeed
                article={node}
                onClick={() =>
                  analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                    type: FEED_TYPE.TAG_DETAIL,
                    location: i,
                    entrance: id
                  })
                }
                inTagDetailLatest
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>

      {!isMediumUp && pageInfo.hasNextPage && (
        <LoadMore onClick={loadMore} loading={loading} />
      )}
    </section>
  )
}

export default LatestArticles
