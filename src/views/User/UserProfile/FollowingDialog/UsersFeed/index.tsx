import { useContext, useEffect } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  Translate,
  usePublicQuery,
  UserDigest,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserFollowingUsersPublicQuery } from '~/gql/graphql'

import {
  USER_FOLLOWING_USERS_PRIVATE,
  USER_FOLLOWING_USERS_PUBLIC,
} from './gql'

const UsersFeed = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<UserFollowingUsersPublicQuery>(USER_FOLLOWING_USERS_PUBLIC, {
      variables: { userName },
    })

  // pagination
  const user = data?.user
  const connectionPath = 'user.following.users'
  const { edges, pageInfo } = user?.following?.users || {}

  // private data
  const loadPrivate = (publicData?: UserFollowingUsersPublicQuery) => {
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

  /**
   * Render
   */
  if (loading) {
    return <SpinnerBlock />
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
            zh_hans="还没有关注任何人"
            en="Not following anyone"
          />
        }
      />
    )
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder={false}>
        {edges.map(({ node }, i) => (
          <List.Item key={node.id}>
            <UserDigest.Rich
              user={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'followee',
                  contentType: 'user',
                  location: i,
                  id: node.id,
                })
              }
              spacing={[12, 16]}
              hasFollow={false}
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default UsersFeed
