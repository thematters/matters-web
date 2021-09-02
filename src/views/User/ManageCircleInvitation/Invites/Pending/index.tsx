import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'

import {
  CircleInvitation,
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Throw404,
  Translate,
  useEventListener,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'
import CIRCLE_PENDING_INVITES from '~/components/GQL/queries/circlePendingInvites'

import { REFETCH_CIRCLE_PENDING_INVITES } from '~/common/enums'
import { mergeConnections } from '~/common/utils'

import styles from './styles.css'

import { CirclePendingInvites } from '~/components/GQL/queries/__generated__/CirclePendingInvites'

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
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  const { data, loading, error, fetchMore, refetch } =
    useQuery<CirclePendingInvites>(CIRCLE_PENDING_INVITES, {
      variables: { userName },
    })

  // pagination
  const connectionPath = 'circle.invites.pending'
  const circle = data?.user?.ownCircles && data.user.ownCircles[0]
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
  usePullToRefresh.Handler(refetch)

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
          <Translate
            zh_hant="你還沒有邀請任何用戶喔！點擊新增邀請，添加站內或站外朋友加入圍爐贈與對方免費資格的固定時長"
            zh_hans="你还没有邀请任何用户喔！点击新增邀请，添加站内或站外朋友加入围炉赠与对方免费资格的固定时长"
            en="You have not invited anyone! Invite others to join your circle by clicking add trial invitation button."
          />
        }
      />
    )
  }

  return (
    <section className="container">
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List hasBorder={false}>
          {(edges || []).map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <CircleInvitation invitation={node} />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>

      <style jsx>{styles}</style>
    </section>
  )
}

export default PendingInvites
