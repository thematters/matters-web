import { useQuery } from '@apollo/react-hooks'

import { analytics, mergeConnections, toPath } from '~/common/utils'
import {
  EmptySearch,
  InfiniteScroll,
  Menu,
  Spinner,
  Translate,
  UserDigest,
  useRoute,
} from '~/components'
import { SearchAggregateUsersPublicQuery } from '~/gql/graphql'

import EndOfResults from './EndOfResults'
import { SEARCH_AGGREGATE_USERS_PUBLIC } from './gql'
import styles from './styles.css'

const AggregateUserResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')
  // TODO: Just test for team, will be removed when release
  const version = getQuery('version')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore, refetch } =
    useQuery<SearchAggregateUsersPublicQuery>(SEARCH_AGGREGATE_USERS_PUBLIC, {
      variables: { key: q, version: version === '' ? undefined : version },
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
    return (
      <EmptySearch
        description={
          <Translate
            zh_hant="沒有找到相關用戶，換個關鍵詞試試？"
            zh_hans="没有找到相关用户，换个关键词试试？"
            en="No users found. Try a different keyword?"
          />
        }
      />
    )
  }

  // load next page
  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'search_user',
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
      {!pageInfo.hasNextPage && <EndOfResults />}
      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateUserResults
