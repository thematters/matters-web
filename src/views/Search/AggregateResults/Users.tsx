import { useEffect } from 'react'

import {
  LATER_SEARCH_RESULTS_LENGTH,
  MAX_SEARCH_RESULTS_LENGTH,
} from '~/common/enums'
import { analytics, mergeConnections, toPath } from '~/common/utils'
import {
  EmptySearch,
  InfiniteScroll,
  Menu,
  SpinnerBlock,
  Translate,
  usePublicQuery,
  UserDigest,
  useRoute,
} from '~/components'
import { SearchAggregateUsersPublicQuery } from '~/gql/graphql'

import { SEARCH_AGGREGATE_USERS_PUBLIC } from './gql'
import styles from './styles.module.css'

const AggregateUserResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore } =
    usePublicQuery<SearchAggregateUsersPublicQuery>(
      SEARCH_AGGREGATE_USERS_PUBLIC,
      { variables: { key: q } }
    )

  useEffect(() => {
    analytics.trackEvent('load_more', {
      type: 'search_user',
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
      <InfiniteScroll
        hasNextPage={
          pageInfo.hasNextPage && edges.length < MAX_SEARCH_RESULTS_LENGTH
        }
        loadMore={loadMore}
        eof
      >
        <Menu>
          {edges.map(
            ({ node, cursor }, i) =>
              node.__typename === 'User' && (
                <Menu.Item
                  key={cursor + node.id}
                  spacing={[16, 0]}
                  {...toPath({
                    page: 'userProfile',
                    userName: node.userName || '',
                  })}
                  bgActiveColor="none"
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search_user',
                      contentType: 'user',
                      location: i,
                      id: node.id,
                      searchKey: q,
                    })
                  }
                >
                  <UserDigest.Rich
                    user={node}
                    bgColor="transparent"
                    bgActiveColor="transparent"
                    hasFollow={false}
                    hasState={false}
                    spacing={[0, 0]}
                    subtitle={`@${node.userName}`}
                  />
                </Menu.Item>
              )
          )}
        </Menu>
      </InfiniteScroll>
    </section>
  )
}

export default AggregateUserResults
