import { useQuery } from '@apollo/react-hooks'

import {
  InfiniteScroll,
  Menu,
  Spinner,
  UserDigest,
  useRoute,
} from '~/components'

import { analytics, mergeConnections, toPath } from '~/common/utils'

import { SEARCH_AGGREGATE_USERS_PUBLIC } from './gql'
import styles from './styles.css'

import { SearchAggregateUsersPublic } from './__generated__/SearchAggregateUsersPublic'

const AggregateUserResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore, refetch } =
    useQuery<SearchAggregateUsersPublic>(SEARCH_AGGREGATE_USERS_PUBLIC, {
      variables: { key: q },
      fetchPolicy: 'network-only',
    })

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
    return null
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
              node.__typename === 'User' && (
                <Menu.Item
                  key={cursor}
                  spacing={['base', 'base']}
                  {...toPath({
                    page: 'userProfile',
                    userName: node.userName || '',
                  })}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search',
                      contentType: 'user',
                      location: i,
                      id: node.id,
                    })
                  }
                >
                  <UserDigest.Concise user={node} avatarSize="xl" />
                </Menu.Item>
              )
          )}
        </Menu>
      </InfiniteScroll>

      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateUserResults
