import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { REFETCH_CIRCLE_PENDING_INVITES } from '~/common/enums'
import { mergeConnections } from '~/common/utils'
import {
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Throw404,
  useEventListener,
  useRoute,
  ViewerContext,
} from '~/components'
import { CirclePendingInvitesQuery } from '~/gql/graphql'

import { CircleInvitation } from '../CircleInvitation'
import { CIRCLE_PENDING_INVITES } from './gql'

/**
 * This component is for listing circle pending invitations.
 *
 * Usage:
 *
 * ```
 *   <PendingInvites />
 * ```
 */
const PendingInvites = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')

  /**
   * Data Fetching
   */
  const { data, loading, error, fetchMore, refetch } =
    useQuery<CirclePendingInvitesQuery>(CIRCLE_PENDING_INVITES, {
      variables: { name },
    })

  // pagination
  const connectionPath = 'circle.invites.pending'
  const circle = data?.circle
  const { edges, pageInfo } = circle?.invites.pending || {}
  const isOwner = circle?.owner.id === viewer.id

  // load next page
  const loadMore = async () => {
    await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  useEventListener(REFETCH_CIRCLE_PENDING_INVITES, refetch)

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!circle || !isOwner || !pageInfo) {
    return <Throw404 />
  }

  if (!edges || edges.length <= 0) {
    return (
      <EmptyWarning
        description={
          <FormattedMessage
            defaultMessage="You have not invited anyone yet! Invite friends to join your circle by clicking 'invite friends'."
            id="lNjDPr"
            description="src/views/Circle/Settings/ManageInvitation/Invites/Pending/index.tsx"
          />
        }
      />
    )
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder={false}>
        {(edges || []).map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <CircleInvitation invitation={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default PendingInvites
