import { useContext, useEffect } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  Dialog,
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { UserFollowerPublicQuery } from '~/gql/graphql'

import { USER_FOLLOWERS_PRIVATE, USER_FOLLOWERS_PUBLIC } from './gql'

const FollowersDialogContent = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<UserFollowerPublicQuery>(USER_FOLLOWERS_PUBLIC, {
      variables: { userName },
    })

  // pagination
  const user = data?.user
  const connectionPath = 'user.followers'
  const { edges, pageInfo } = user?.followers || {}

  // private data
  const loadPrivate = (publicData?: UserFollowerPublicQuery) => {
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
            zh_hant="還沒有追蹤者"
            zh_hans="还没有关注者"
            en="No followers yet"
          />
        }
      />
    )
  }

  return (
    <Dialog.Content noSpacing>
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List hasBorder={false}>
          {edges.map(({ node }, i) => (
            <List.Item key={node.id}>
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
                spacing={[12, 16]}
                hasFollow={false}
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </Dialog.Content>
  )
}

export default FollowersDialogContent
