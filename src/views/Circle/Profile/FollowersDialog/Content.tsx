import { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  Dialog,
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { CircleFollowersPublicQuery } from '~/gql/graphql'

import { CIRCLE_FOLLOWERS_PRIVATE, CIRCLE_FOLLOWERS_PUBLIC } from './gql'

const FollowersDialogContent = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')
  const intl = useIntl()

  /**
   * Public data fetching
   */
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<CircleFollowersPublicQuery>(CIRCLE_FOLLOWERS_PUBLIC, {
      variables: { name },
    })

  const circle = data?.circle
  const connectionPath = 'circle.followers'
  const { edges, pageInfo } = circle?.followers || {}

  /**
   * Private data fetching
   */
  const loadPrivate = (publicData?: CircleFollowersPublicQuery) => {
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
    analytics.trackEvent('load_more', {
      type: 'circle_follower',
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

  if (!data || !circle || !edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={intl.formatMessage({
          defaultMessage: 'No followers yet',
          id: 'XVYrS/',
        })}
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
                    type: 'circle_follower',
                    contentType: 'user',
                    location: i,
                    id: node.id,
                  })
                }
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
