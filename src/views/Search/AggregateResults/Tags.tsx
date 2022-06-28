import {
  Card,
  List,
  Spinner,
  Tag,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
} from '~/components'

import { analytics, toPath } from '~/common/utils'

import { SEARCH_AGGREGATE_TAGS_PUBLIC } from './gql'
import styles from './styles.css'
import ViewMoreButton from './ViewMoreButton'

import { SearchAggregateTagsPublic } from './__generated__/SearchAggregateTagsPublic'

const AggregateTagResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, refetch } = usePublicQuery<SearchAggregateTagsPublic>(
    SEARCH_AGGREGATE_TAGS_PUBLIC,
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
            node.__typename === 'TagSearchResult' && (
              <List.Item key={cursor}>
                <Card
                  spacing={['base', 'base']}
                  {...toPath({
                    page: 'tagDetail',
                    id: node.id,
                    content: node.content,
                  })}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search',
                      contentType: 'tag',
                      location: i,
                      id: node.id,
                    })
                  }
                >
                  <Tag tag={node} type="list" />
                </Card>
              </List.Item>
            )
        )}
      </List>

      <ViewMoreButton q={q} type="tag" />

      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateTagResults
