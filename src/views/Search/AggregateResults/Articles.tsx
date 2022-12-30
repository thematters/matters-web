import { analytics, toPath } from '~/common/utils'
import {
  ArticleDigestTitle,
  Card,
  List,
  Spinner,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
} from '~/components'

import { SearchAggregateArticlesPublic } from './__generated__/SearchAggregateArticlesPublic'
import { SEARCH_AGGREGATE_ARTICLES_PUBLIC } from './gql'
import styles from './styles.css'
import ViewMoreButton from './ViewMoreButton'

const AggregateArticleResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, refetch } =
    usePublicQuery<SearchAggregateArticlesPublic>(
      SEARCH_AGGREGATE_ARTICLES_PUBLIC,
      { variables: { key: q } }
    )

  const { edges, pageInfo } = data?.search || {}

  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  return (
    <section className="aggregate-section">
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
                  <ArticleDigestTitle
                    article={node}
                    is="h3"
                    textWeight="normal"
                    textSize="md"
                  />
                </Card>
              </List.Item>
            )
        )}
      </List>

      <ViewMoreButton q={q} type="article" />

      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateArticleResults
