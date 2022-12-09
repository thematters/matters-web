import { useQuery } from '@apollo/react-hooks'
import { Fragment } from 'react'

import {
  EmptySearch,
  InfiniteScroll,
  Menu,
  Spinner,
  TagDigest,
  Translate,
  useRoute,
} from '~/components'

import { analytics, mergeConnections, toPath } from '~/common/utils'

import EndOfResults from './EndOfResults'
import { SEARCH_AGGREGATE_TAGS_PUBLIC } from './gql'
import styles from './styles.css'

import { SearchAggregateTagsPublic } from './__generated__/SearchAggregateTagsPublic'

const AggregateTagResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore, refetch } =
    useQuery<SearchAggregateTagsPublic>(SEARCH_AGGREGATE_TAGS_PUBLIC, {
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
      type: 'search_article',
      location: edges.length || 0,
    })

    return fetchMore({
      variables: { after: pageInfo.endCursor },
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
        <Menu>
          {edges.map(
            ({ node, cursor }, i) =>
              node.__typename === 'Tag' && (
                <Fragment key={cursor}>
                  <Menu.Item
                    spacing={['base', 'base']}
                    {...toPath({
                      page: 'tagDetail',
                      tag: node,
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
                    <TagDigest.Concise tag={node} showArticlesNum />
                  </Menu.Item>
                </Fragment>
              )
          )}
        </Menu>
      </InfiniteScroll>
      {!pageInfo.hasNextPage && <EndOfResults />}
      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateTagResults
