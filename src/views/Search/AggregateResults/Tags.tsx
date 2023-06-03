import { Fragment, useEffect } from 'react'

import {
  LATER_SEARCH_RESULTS_LENGTH,
  MAX_SEARCH_RESULTS_LENGTH,
} from '~/common/enums'
import { analytics, mergeConnections, toPath } from '~/common/utils'
import {
  EmptySearch,
  InfiniteScroll,
  Menu,
  Spinner,
  TagDigest,
  Translate,
  usePublicQuery,
  useRoute,
} from '~/components'
import { SearchAggregateTagsPublicQuery } from '~/gql/graphql'

import EndOfResults from './EndOfResults'
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
    return <Spinner />
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
    <section className="aggregate-section">
      <InfiniteScroll
        hasNextPage={
          pageInfo.hasNextPage && edges.length < MAX_SEARCH_RESULTS_LENGTH
        }
        loadMore={loadMore}
      >
        <Menu>
          {edges.map(
            ({ node, cursor }, i) =>
              node.__typename === 'Tag' && (
                <Fragment key={cursor + node.id}>
                  <Menu.Item
                    spacing={['base', 0]}
                    {...toPath({
                      page: 'tagDetail',
                      tag: node,
                    })}
                    bgActiveColor="none"
                    onClick={() =>
                      analytics.trackEvent('click_feed', {
                        type: 'search_tag',
                        contentType: 'tag',
                        location: i,
                        id: node.id,
                        searchKey: q,
                      })
                    }
                  >
                    <TagDigest.Concise tag={node} showArticlesNum />
                  </Menu.Item>
                </Fragment>
              )
          )}
        </Menu>
      </InfiniteScroll>
      {(!pageInfo.hasNextPage || edges.length >= MAX_SEARCH_RESULTS_LENGTH) && (
        <EndOfResults />
      )}
    </section>
  )
}

export default AggregateTagResults
