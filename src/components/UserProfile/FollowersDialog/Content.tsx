import { useContext, useEffect } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  Dialog,
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { UserFollowerPublic } from './__generated__/UserFollowerPublic'
import { USER_FOLLOWERS_PRIVATE, USER_FOLLOWERS_PUBLIC } from './gql'

const FollowersDialogContent = () => {
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
  } = usePublicQuery<UserFollowerPublic>(USER_FOLLOWERS_PUBLIC, {
    variables: { userName },
  })

  // pagination
  const user = data?.user
  const connectionPath = 'user.followers'
  const { edges, pageInfo } = user?.followers || {}

  // private data
  const loadPrivate = (publicData?: UserFollowerPublic) => {
    if (!viewer.isAuthed || !publicData || !user) {
      return
    }

    const publiceEdges = publicData.user?.followers.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: USER_FOLLOWERS_PRIVATE,
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
      type: 'follower',
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
            zh_hant="還沒有追蹤者"
            zh_hans="还没有追踪者"
            en="No followers yet"
          />
        }
      />
    )
  }

  return (
    <Dialog.Content spacing={['base', 0]}>
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List hasBorder={false}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'follower',
                    contentType: 'user',
                    location: i,
                    id: node.id,
                  })
                }
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </Dialog.Content>
  )
}

export default FollowersDialogContent
