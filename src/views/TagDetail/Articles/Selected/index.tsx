import { NetworkStatus, useQuery } from '@apollo/client'
import _get from 'lodash/get'

import {
  ArticleDigestFeed,
  EmptyTagArticles,
  InfiniteScroll,
  List,
  Spinner,
  useEventListener,
  usePullToRefresh,
} from '~/components'
import { QueryError } from '~/components/GQL'
import TAG_ARTICLES from '~/components/GQL/queries/tagArticles'

import { REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import {
  TagArticles,
  TagArticles_node_Tag_articles,
} from '~/components/GQL/queries/__generated__/TagArticles'

const SelectedArticles = ({ id }: { id: string }) => {
  const { data, loading, error, fetchMore, refetch, networkStatus } = useQuery<
    TagArticles
  >(TAG_ARTICLES, {
    variables: { id, selected: true },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const connectionPath = 'node.articles'
  const articles = _get(data, connectionPath) as TagArticles_node_Tag_articles
  const { edges, pageInfo } = articles || { edges: [], pageInfo: {} }
  const isNewLoading = networkStatus === NetworkStatus.loading
  const hasArticles = edges && edges.length > 0 && pageInfo

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'tag_detail_selected',
      location: edges ? edges.length : 0,
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }
  const sync = ({
    event,
    differences = 0,
  }: {
    event: 'add' | 'delete'
    differences?: number
  }) => {
    const { edges: items } = _get(data, 'node.articles', { edges: [] })
    switch (event) {
      case 'add':
        refetch({
          variables: {
            id,
            first: items.length + differences,
          },
        })
        break
      case 'delete':
        refetch({
          variables: {
            id,
            first: Math.max(items.length - 1, 0),
          },
        })
        break
    }
  }

  useEventListener(REFETCH_TAG_DETAIL_ARTICLES, sync)
  usePullToRefresh.Handler(refetch)

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
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List>
        {(edges || []).map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <ArticleDigestFeed
              article={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'tag_detail_selected',
                  styleType: 'title',
                  contentType: 'article',
                  location: i,
                })
              }
              inTagDetailSelected
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default SelectedArticles
