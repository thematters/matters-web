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
  useRoute,
  ViewerContext,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { mergeConnections } from '~/common/utils'

import UserListTabs from '../UserListTabs'
import { CIRCLE_FOLLOWERS_PRIVATE, CIRCLE_FOLLOWERS_PUBLIC } from './gql'

import { CircleFollowersPublic } from './__generated__/CircleFollowersPublic'

const CircleFollowers = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')

  /**
   * Public data fetching
   */
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<CircleFollowersPublic>(CIRCLE_FOLLOWERS_PUBLIC, {
    variables: { name },
  })

  const circle = data?.circle
  const connectionPath = 'circle.followers'
  const { edges, pageInfo } = circle?.followers || {}

  /**
   * Private data fetching
   */
  const loadPrivate = (publicData?: CircleFollowersPublic) => {
    if (!viewer.isAuthed || !publicData || !circle) {
      return
    }

    const publicEdges = publicData.circle?.followers.edges || []
    const publicIds = publicEdges.map(({ node }) => node.id)

    client.query({
      query: CIRCLE_FOLLOWERS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  useEffect(() => loadPrivate(data), [circle?.id, viewer.id])

  /**
   * Fetch more public and private data
   */
  const loadMore = async () => {
    // TODO: add analytics

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
  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading || !data || !circle) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <UserListTabs />
        <EmptyWarning
          description={
            <Translate zh_hant="還沒有追蹤者" zh_hans="还没有追踪者" />
          }
        />
      </>
    )
  }

  return (
    <>
      <UserListTabs />
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List hasBorder={false}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                onClick={() => {
                  // TODO: add analtyics tracker
                }}
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default CircleFollowers
