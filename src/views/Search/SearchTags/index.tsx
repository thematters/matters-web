import { useRouter } from 'next/router'

import {
  Card,
  EmptySearch,
  InfiniteScroll,
  List,
  Spinner,
  Tag,
  usePublicQuery,
} from '~/components'

import { analytics, getQuery, mergeConnections, toPath } from '~/common/utils'

import { SEARCH_TAGS_PUBLIC } from './gql'

import { SearchTagsPublic } from './__generated__/SearchTagsPublic'

const SearchTag = () => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore, refetch } = usePublicQuery<
    SearchTagsPublic
  >(SEARCH_TAGS_PUBLIC, {
    variables: { key: q },
  })

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  // load next page
  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'search_tag',
      location: edges?.length || 0,
    })
    return fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  if (edges.length <= 0) {
    return <EmptySearch />
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'Tag' && (
              <List.Item key={cursor}>
                <Card
                  spacing={['base', 'base']}
                  {...toPath({
                    page: 'tagDetail',
                    id: node.id,
                  })}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search_tag',
                      contentType: 'tag',
                      styleType: 'title',
                      location: i,
                    })
                  }
                >
                  <Tag tag={node} type="list" />
                </Card>
              </List.Item>
            )
        )}
      </List>
    </InfiniteScroll>
  )
}

export default SearchTag
