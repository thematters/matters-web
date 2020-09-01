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

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png?url'

import FollowerTabs from '../FollowerTabs'
import { USER_FOLLOWERS_PRIVATE, USER_FOLLOWERS_PUBLIC } from './gql'

import { UserFollowerPublic } from './__generated__/UserFollowerPublic'

const UserFollowers = () => {
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

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: `${user.displayName}的追蹤者`,
        zh_hans: `${user.displayName}的追踪者`,
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
            <Translate zh_hant="還沒有追蹤者" zh_hans="还没有追踪者" />
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
                    type: 'follower',
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

export default UserFollowers
