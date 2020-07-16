import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import {
  Card,
  InfiniteScroll,
  List,
  Spinner,
  Tag,
  Translate,
  usePullToRefresh,
} from '~/components'

import { analytics, getQuery, mergeConnections, toPath } from '~/common/utils'

import EmptySearch from '../EmptySearch'

import { SeachTags } from './__generated__/SeachTags'

const SEARCH_TAGS = gql`
  query SeachTags($key: String!, $after: String) {
    search(input: { key: $key, type: Tag, first: 20, after: $after }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Tag {
            ...DigestTag
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const SearchTag = () => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  const { data, loading, fetchMore, refetch } = useQuery<SeachTags>(
    SEARCH_TAGS,
    {
      variables: { key: q },
    }
  )

  usePullToRefresh.Handler(refetch)

  if (loading) {
    return <Spinner />
  }

  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'search_tag',
      location: edges.length,
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

  if (edges.length <= 0) {
    return <EmptySearch description={<Translate id="emptySearchResults" />} />
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
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
