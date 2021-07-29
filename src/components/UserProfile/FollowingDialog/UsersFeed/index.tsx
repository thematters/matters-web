import { useContext, useEffect } from 'react'

import {
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  UserDigest,
  useRoute,
  ViewerContext,
} from '~/components'

import { analytics, mergeConnections } from '~/common/utils'

import {
  USER_FOLLOWING_USERS_PRIVATE,
  USER_FOLLOWING_USERS_PUBLIC,
} from './gql'

import { UserFollowingUsersPublic } from './__generated__/UserFollowingUsersPublic'

const UsersFeed = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<UserFollowingUsersPublic>(USER_FOLLOWING_USERS_PUBLIC, {
    variables: { userName },
  })

  // pagination
  const user = data?.user
  const connectionPath = 'user.following.users'
  const { edges, pageInfo } = user?.following?.users || {}

  // private data
  const loadPrivate = (publicData?: UserFollowingUsersPublic) => {
    if (!viewer.isAuthed || !publicData || !user) {
      return
    }

    const publicEdges = publicData.user?.following?.users.edges || []
    const publicIds = publicEdges.map(({ node }) => node.id)
    client.query({
      query: USER_FOLLOWING_USERS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate(data)
  }, [user?.id, viewer.id])

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'followee',
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
  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (
    !user ||
    user?.status?.state === 'archived' ||
    !edges ||
    edges.length <= 0 ||
    !pageInfo
  ) {
    return (
      <EmptyWarning
        description={
          <Translate
            zh_hant="還沒有追蹤任何人"
            zh_hans="还没有追踪任何人"
            en="Not following anyone"
          />
        }
      />
    )
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder={false}>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <UserDigest.Rich
              user={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'followee',
                  contentType: 'user',
                  location: i,
                })
              }
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default UsersFeed
