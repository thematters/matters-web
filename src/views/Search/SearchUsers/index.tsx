import { Fragment, useContext, useEffect } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptySearch,
  InfiniteScroll,
  List,
  Spinner,
  usePublicQuery,
  UserDigest,
  useRoute,
  ViewerContext,
} from '~/components'
import { SearchUsersPublicQuery } from '~/gql/graphql'

import GoogleSearchButton from '../GoogleSearchButton'
import { SEARCH_USERS_PRIVATE, SEARCH_USERS_PUBLIC } from './gql'

const SearchUser = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const q = getQuery('q')

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
  } = usePublicQuery<SearchUsersPublicQuery>(SEARCH_USERS_PUBLIC, {
    variables: { key: q },
  })

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  // private data
  const loadPrivate = (publicData?: SearchUsersPublicQuery) => {
    if (!viewer.isAuthed || !publicData) {
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
      variables: { after: pageInfo?.endCursor },
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
    return <EmptySearch />
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
              <Fragment key={i}>
                <List.Item key={cursor}>
                  <UserDigest.Rich
                    user={node}
                    onClick={() =>
                      analytics.trackEvent('click_feed', {
                        type: 'search_user',
                        contentType: 'user',
                        location: i,
                        id: node.id,
                      })
                    }
                  />
                </List.Item>

                {((edges.length > 6 && i === 6) ||
                  (edges.length <= 6 && i === edges.length - 1)) && (
                  <List.Item>
                    <GoogleSearchButton />
                  </List.Item>
                )}
              </Fragment>
            )
        )}
      </List>
    </InfiniteScroll>
  )
}

export default SearchUser
