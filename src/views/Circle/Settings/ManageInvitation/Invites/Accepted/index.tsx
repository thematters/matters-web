import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { useIntl } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  Throw404,
  useRoute,
  ViewerContext,
} from '~/components'
import { CircleAcceptedInvitesQuery } from '~/gql/graphql'

import { CircleInvitation } from '../CircleInvitation'
import { CIRCLE_ACCEPTED_INVITES } from './gql'

/**
 * This component is for listing circle accepted invitations.
 *
 * Usage:
 *
 * ```
 *   <AcceptedInvites />
 * ```
 */
const AcceptedInvites = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')
  const intl = useIntl()

  /**
   * Data Fetching
   */
  const { data, loading, error, fetchMore } =
    useQuery<CircleAcceptedInvitesQuery>(CIRCLE_ACCEPTED_INVITES, {
      variables: { name },
    })

  // pagination
  const connectionPath = 'circle.invites.accepted'
  const circle = data?.circle
  const { edges, pageInfo } = circle?.invites.accepted || {}
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

  /**
   * Render
   */
  if (loading) {
    return <SpinnerBlock />
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
        description={intl.formatMessage({
          defaultMessage: 'friends have not accepted your invitations.',
          id: 'RxiHr/',
          description:
            'src/views/Circle/Settings/ManageInvitation/Invites/Accepted/index.tsx',
        })}
      />
    )
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder={false}>
        {(edges || []).map(({ node, cursor }, i) => (
          <List.Item key={node.id}>
            <CircleInvitation invitation={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default AcceptedInvites
