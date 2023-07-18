import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  Dialog,
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { CircleMembersPublicQuery } from '~/gql/graphql'

import { CIRCLE_MEMBERS_PRIVATE, CIRCLE_MEMBERS_PUBLIC } from './gql'

const MembersDialogContent = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')

  /**
   * Public data fetching
   */
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<CircleMembersPublicQuery>(CIRCLE_MEMBERS_PUBLIC, {
      variables: { name },
    })

  const circle = data?.circle
  const connectionPath = 'circle.members'
  const { edges, pageInfo } = circle?.members || {}

  /**
   * Private data fetching
   */
  const loadPrivate = (publicData?: CircleMembersPublicQuery) => {
    if (!viewer.isAuthed || !publicData || !circle) {
      return
    }

    const publicEdges = publicData.circle?.members.edges || []
    const publicIds = publicEdges.map(({ node }) => node.user.id)

    client.query({
      query: CIRCLE_MEMBERS_PRIVATE,
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
      type: 'circle_member',
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

  if (!data || !circle || !edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={
          <FormattedMessage
            defaultMessage="No members yet"
            description="src/views/Circle/Profile/MembersDialog/Content.tsx"
          />
        }
      />
    )
  }

  return (
    <Dialog.Content>
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List hasBorder={false}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node.user}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'circle_member',
                    contentType: 'user',
                    location: i,
                    id: node.user.id,
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

export default MembersDialogContent
