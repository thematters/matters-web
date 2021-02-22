import { useContext, useEffect } from 'react'

import {
  EmptyWarning,
  Head,
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

import { analytics, mergeConnections } from '~/common/utils'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png?url'

import FollowerTabs from '../FollowerTabs'
import { USER_FOLLOWEES_PRIVATE, USER_FOLLOWEES_PUBLIC } from './gql'

import { UserFolloweePublic } from './__generated__/UserFolloweePublic'

const UserFollowees = () => {
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
  } = usePublicQuery<UserFolloweePublic>(USER_FOLLOWEES_PUBLIC, {
    variables: { userName },
  })

  // pagination
  const user = data?.user
  const connectionPath = 'user.followees'
  const { edges, pageInfo } = user?.followees || {}

  // private data
  const loadPrivate = (publicData?: UserFolloweePublic) => {
    if (!viewer.isAuthed || !publicData || !user) {
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
  if (loading) {
    return (
      <>
        <FollowerTabs />
        <Spinner />
      </>
    )
  }

  if (error) {
    return (
      <>
        <FollowerTabs />
        <QueryError error={error} />
      </>
    )
  }

  if (!user || user?.status?.state === 'archived') {
    return (
      <>
        <FollowerTabs />
        <EmptyWarning
          description={
            <Translate zh_hant="還沒有追蹤任何人" zh_hans="还没有追踪任何人" />
          }
        />
      </>
    )
  }

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: `${user.displayName}追蹤的作者`,
        zh_hans: `${user.displayName}追踪的作者`,
        en: `followed by ${user.displayName}`,
      }}
      description={user.info.description}
      image={user.info.profileCover || IMAGE_LOGO_192}
    />
  )

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <CustomHead />
        <FollowerTabs />
        <EmptyWarning
          description={
            <Translate
              zh_hant="還沒有追蹤任何人"
              zh_hans="还没有追踪任何人"
              en="not following anyone"
            />
          }
        />
      </>
    )
  }

  return (
    <>
      <CustomHead />

      <FollowerTabs />

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
