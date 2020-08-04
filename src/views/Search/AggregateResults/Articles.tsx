import { useRouter } from 'next/router'

import {
  ArticleDigestTitle,
  Card,
  List,
  Spinner,
  usePublicQuery,
  usePullToRefresh,
} from '~/components'

import { analytics, getQuery, toPath } from '~/common/utils'

import { SEARCH_AGGREGATE_ARTICLES_PUBLIC } from './gql'
import styles from './styles.css'
import ViewMoreButton from './ViewMoreButton'

import { SeachAggregateArticlesPublic } from './__generated__/SeachAggregateArticlesPublic'

const AggregateArticleResults = () => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, refetch } = usePublicQuery<
    SeachAggregateArticlesPublic
  >(SEARCH_AGGREGATE_ARTICLES_PUBLIC, { variables: { key: q } })

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
                      styleType: 'title',
                      location: i,
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
