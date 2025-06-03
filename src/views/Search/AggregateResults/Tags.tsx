import { useEffect } from 'react'

import {
  LATER_SEARCH_RESULTS_LENGTH,
  MAX_SEARCH_RESULTS_LENGTH,
} from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptySearch,
  SpinnerBlock,
  TagList,
  Translate,
  usePublicQuery,
  useRoute,
} from '~/components'
import {
  SearchAggregateTagsPublicQuery,
  TagDigestFeedTagFragment,
} from '~/gql/graphql'

import { SEARCH_AGGREGATE_TAGS_PUBLIC } from './gql'
import styles from './styles.module.css'

const AggregateTagResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore } =
    usePublicQuery<SearchAggregateTagsPublicQuery>(
      SEARCH_AGGREGATE_TAGS_PUBLIC,
      { variables: { key: q } }
    )

  useEffect(() => {
    analytics.trackEvent('load_more', {
      type: 'search_tag',
      location: 0,
      searchKey: q,
    })
  }, [])

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  /**
   * Render
   */
  if (loading) {
    return <SpinnerBlock />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptySearch
        description={
          <Translate
            zh_hant="沒有找到相關標籤，換個關鍵詞試試？"
            zh_hans="没有找到相关标签，换个关键词试试？"
            en="No tags found. Try a different keyword?"
          />
        }
      />
    )
  }

  // load next page
  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'search_tag',
      location: edges.length || 0,
      searchKey: q,
    })

    return fetchMore({
      variables: {
        first:
          edges.length === MAX_SEARCH_RESULTS_LENGTH - 10
            ? 10
            : LATER_SEARCH_RESULTS_LENGTH,
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

  return (
    <section className={styles.aggregateSection}>
      <TagList.Infinite
        edges={
          edges as Array<{ node: TagDigestFeedTagFragment; cursor?: string }>
        }
        pageInfo={pageInfo}
        loadMore={loadMore}
        trackingType="search_tag"
        searchKey={q}
        maxResults={MAX_SEARCH_RESULTS_LENGTH}
      />
    </section>
  )
}

export default AggregateTagResults
