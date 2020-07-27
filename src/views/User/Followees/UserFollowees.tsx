import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import {
  EmptyWarning,
  Head,
  InfiniteScroll,
  List,
  Spinner,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'
import { UserDigest } from '~/components/UserDigest'

import { analytics, getQuery, mergeConnections } from '~/common/utils'

import { USER_FOLLOWEES_PRIVATE, USER_FOLLOWEES_PUBLIC } from './gql'

import { UserFolloweePublic } from './__generated__/UserFolloweePublic'

const UserFollowees = () => {
  const viewer = useContext(ViewerContext)
  const router = useRouter()
  const userName = getQuery({ router, key: 'userName' })

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
  } = usePublicQuery<UserFolloweePublic>(USER_FOLLOWEES_PUBLIC, {
    variables: { userName },
  })

  // pagination
  const user = data?.user
  const connectionPath = 'user.followees'
  const { edges, pageInfo } = user?.followees || {}

  // private data
  const loadPrivate = (publicData?: UserFolloweePublic) => {
    if (!viewer.id || !publicData || !user) {
      return
    }

    const publiceEdges = publicData.user?.followees.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: USER_FOLLOWEES_PRIVATE,
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
  if (loading || !data || !user) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={
          <Translate zh_hant="還沒有追蹤任何人" zh_hans="还没有追踪任何人" />
        }
      />
    )
  }

  return (
    <>
      <Head
        title={{
          zh_hant: `${user.displayName}追蹤的作者`,
          zh_hans: `${user.displayName}追踪的作者`,
        }}
      />

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
                    styleType: 'card',
                    location: i,
                  })
                }
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default UserFollowees
