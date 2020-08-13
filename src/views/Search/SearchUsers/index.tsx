import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import {
  InfiniteScroll,
  List,
  Spinner,
  Translate,
  usePublicQuery,
  UserDigest,
  ViewerContext,
} from '~/components'

import { analytics, getQuery, mergeConnections } from '~/common/utils'

import EmptySearch from '../EmptySearch'
import { SEARCH_USERS_PRIVATE, SEARCH_USERS_PUBLIC } from './gql'

import { SearchUsersPublic } from './__generated__/SearchUsersPublic'

const SearchUser = () => {
  const viewer = useContext(ViewerContext)
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    fetchMore,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<SearchUsersPublic>(SEARCH_USERS_PUBLIC, {
    variables: { key: q },
  })

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  // private data
  const loadPrivate = (publicData?: SearchUsersPublic) => {
    if (!viewer.id || !publicData) {
      return
    }

    const publicIds = (publicData?.search.edges || [])
      .filter(({ node }) => node.__typename === 'User')
      .map(({ node }) => node.__typename === 'User' && node.id)

    client.query({
      query: SEARCH_USERS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    if (loading || !edges) {
      return
    }

    loadPrivate(data)
  }, [!!edges, viewer.id])

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'search_user',
      location: edges?.length || 0,
    })

    const { data: newData } = await fetchMore({
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

    loadPrivate(newData)
  }

  // refetch & pull to refresh
  const refetch = async () => {
    const { data: newData } = await refetchPublic()
    loadPrivate(newData)
  }

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptySearch description={<Translate id="emptySearchResults" />} />
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List hasBorder={false}>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'User' && (
              <List.Item key={cursor}>
                <UserDigest.Rich
                  user={node}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search_user',
                      contentType: 'user',
                      styleType: 'card',
                      location: i,
                    })
                  }
                />
              </List.Item>
            )
        )}
      </List>
    </InfiniteScroll>
  )
}

export default SearchUser
