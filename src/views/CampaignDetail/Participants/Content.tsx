import { useQuery } from '@apollo/client'
import { useContext } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  Dialog,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { GetParticipantsQuery } from '~/gql/graphql'
import { GET_PARTICIPANTS } from '~/views/CampaignDetail/gql'

type Props = {
  type: 'dialog' | 'drawer'
}

const ParticipantsContent = ({ type }: Props) => {
  const isDrawer = type === 'drawer'
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')

  const { data, loading, error, fetchMore } = useQuery<GetParticipantsQuery>(
    GET_PARTICIPANTS,
    { variables: { shortHash } }
  )

  // pagination
  const campaign = data?.campaign
  const connectionPath = 'campaign.participants'
  const { edges, pageInfo } = campaign?.participants || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'follower',
      location: edges?.length || 0,
    })
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

  if (loading) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!campaign || !edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const isViewerApplySucceeded = campaign.application?.state === 'succeeded'

  const children = (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder={false}>
        {isViewerApplySucceeded && (
          <List.Item>
            <UserDigest.Rich
              user={viewer}
              spacing={[12, isDrawer ? 0 : 16]}
              hasFollow={false}
            />
          </List.Item>
        )}
        {edges
          .filter((e) => e.node.id !== viewer.id)
          .map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                spacing={[12, isDrawer ? 0 : 16]}
                hasFollow={false}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'campaign_detail_participant',
                    contentType: 'user',
                    location: i,
                    id: node.id,
                  })
                }
              />
            </List.Item>
          ))}
      </List>
    </InfiniteScroll>
  )

  if (isDrawer) {
    return <>{children}</>
  }

  return <Dialog.Content noSpacing>{children}</Dialog.Content>
}

export default ParticipantsContent
