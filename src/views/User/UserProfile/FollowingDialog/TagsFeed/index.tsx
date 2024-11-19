import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  TagDigest,
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
          <FormattedMessage
            defaultMessage="Not following any tag"
            id="Zakh0i"
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
              spacing={[12, 16]}
              bgColor="none"
              bgActiveColor="greyLighter"
              hasFollow
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default TagsFeed
