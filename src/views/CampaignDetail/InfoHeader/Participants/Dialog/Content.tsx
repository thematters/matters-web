import { useContext } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  Dialog,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { GetParticipantsQuery } from '~/gql/graphql'

import { GET_PARTICIPANTS } from './gql'

const ParticipantsDialogContent = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')

  const { data, loading, error, fetchMore } =
    usePublicQuery<GetParticipantsQuery>(GET_PARTICIPANTS, {
      variables: { shortHash },
    })

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

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const isViewerApplySucceeded = campaign?.applicationState === 'succeeded'

  return (
    <Dialog.Content noSpacing>
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List hasBorder={false}>
          {isViewerApplySucceeded && (
            <List.Item>
              <UserDigest.Rich
                user={viewer}
                spacing={[12, 16]}
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
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'campaign_participant',
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

export default ParticipantsDialogContent
