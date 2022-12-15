import { useQuery } from '@apollo/react-hooks'

import {
  ArticleDigestFeed,
  EmptySearch,
  InfiniteScroll,
  List,
  Spinner,
  Translate,
  useRoute,
} from '~/components'

import { analytics, mergeConnections } from '~/common/utils'

import EndOfResults from './EndOfResults'
import { SEARCH_AGGREGATE_ARTICLES_PUBLIC } from './gql'
import styles from './styles.css'

import { SearchAggregateArticlesPublic } from './__generated__/SearchAggregateArticlesPublic'

const AggregateArticleResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore, refetch } =
    useQuery<SearchAggregateArticlesPublic>(SEARCH_AGGREGATE_ARTICLES_PUBLIC, {
      variables: { key: q },
      fetchPolicy: 'network-only',
    })

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptySearch
        description={
          <Translate
            zh_hant="沒有找到相關文章，換個關鍵詞試試？"
            zh_hans="没有找到相关文章，换个关键词试试？"
            en="No articles found. Try a different keyword?"
          />
        }
      />
    )
  }

  // load next page
  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'search_article',
      location: edges?.length || 0,
    })

    return fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <section className="aggregate-section">
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        pullToRefresh={refetch}
      >
        <List>
          {edges.map(
            ({ node, cursor }, i) =>
              node.__typename === 'Article' && (
                <List.Item key={cursor}>
                  <ArticleDigestFeed
                    article={node}
                    isConciseFooter={true}
                    hasCircle={false}
                    hasFollow={false}
                  />
                </List.Item>
              )
          )}
        </List>
      </InfiniteScroll>
      {!pageInfo.hasNextPage && <EndOfResults />}
      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateArticleResults
