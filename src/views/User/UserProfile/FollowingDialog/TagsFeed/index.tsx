import { useContext, useEffect } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  TagDigest,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserFollowingTagsPublicQuery } from '~/gql/graphql'

import { USER_FOLLOWING_TAGS_PRIVATE, USER_FOLLOWING_TAGS_PUBLIC } from './gql'

const TagsFeed = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<UserFollowingTagsPublicQuery>(USER_FOLLOWING_TAGS_PUBLIC, {
      variables: { userName },
    })

  // pagination
  const user = data?.user
  const connectionPath = 'user.following.tags'
  const { edges, pageInfo } = user?.following?.tags || {}

  // private data
  const loadPrivate = (publicData?: UserFollowingTagsPublicQuery) => {
    if (!viewer.isAuthed || !publicData || !user) {
      return
    }

    const publicEdges = publicData.user?.following?.tags.edges || []
    const publicIds = publicEdges.map(({ node }) => node.id)
    client.query({
      query: USER_FOLLOWING_TAGS_PRIVATE,
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
            zh_hant="還沒有追蹤任標籤"
            zh_hans="还没有追踪任标签"
            en="Not following any tag"
          />
        }
      />
    )
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder={false}>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={node.id}>
            <TagDigest.Rich
              tag={node}
              spacing={['tight', 'base']}
              bgColor="none"
              bgActiveColor="greyLighter"
              hasDesc
              hasFollow
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default TagsFeed
