import { useQuery } from '@apollo/react-hooks'

import {
  ArticleDigestConcise,
  Card,
  InfiniteScroll,
  List,
  Spinner,
  useRoute,
} from '~/components'
import { SearchAggregateArticlesPublicQuery } from '~/gql/graphql'

import { analytics, mergeConnections, toPath } from '~/common/utils'

import { SEARCH_AGGREGATE_ARTICLES_PUBLIC } from './gql'
import styles from './styles.css'

const AggregateArticleResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore, refetch } =
    useQuery<SearchAggregateArticlesPublicQuery>(
      SEARCH_AGGREGATE_ARTICLES_PUBLIC,
      {
        variables: { key: q },
        fetchPolicy: 'network-only',
      }
    )

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
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
                  <Card
                    spacing={['base', 'base']}
                    {...toPath({
                      page: 'articleDetail',
                      article: node,
                    })}
                    onClick={() =>
                      analytics.trackEvent('click_feed', {
                        type: 'search',
                        contentType: 'article',
                        location: i,
                        id: node.id,
                      })
                    }
                  >
                    <ArticleDigestConcise article={node} />
                  </Card>
                </List.Item>
              )
          )}
        </List>
      </InfiniteScroll>
      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateArticleResults
