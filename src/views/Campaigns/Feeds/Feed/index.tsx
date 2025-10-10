import { mergeConnections } from '~/common/utils'
import {
  CampaignDigest,
  Grid,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  usePublicQuery,
} from '~/components'
import { CampaignsQuery } from '~/gql/graphql'

import {
  CAMPAIGNS_FEED_TYPE_ENDED,
  CAMPAIGNS_FEED_TYPE_IN_PROGRESS,
} from '../Tabs'
import { CAMPAIGNS_PUBLIC } from './gql'

type FeedProps = {
  feedType: string
}

const Feed = ({ feedType }: FeedProps) => {
  const isInProgress = feedType === CAMPAIGNS_FEED_TYPE_IN_PROGRESS
  const isInFinished = feedType === CAMPAIGNS_FEED_TYPE_ENDED
  const filterState = isInProgress ? 'active' : 'finished'

  const { data, loading, error, fetchMore } = usePublicQuery<CampaignsQuery>(
    CAMPAIGNS_PUBLIC,
    {
      variables: { state: filterState },
    }
  )
  const edges = data?.campaigns?.edges || []
  const pageInfo = data?.campaigns?.pageInfo
  const connectionPath = 'campaigns'

  const loadMore = async () => {
    if (loading) {
      return
    }

    const { data: newData } = await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
        state: filterState,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true,
        }),
    })

    return { newData, count: edges?.length || 0 }
  }

  if (loading) {
    return null
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <InfiniteScroll
      hasNextPage={false || pageInfo?.hasNextPage}
      loadMore={loadMore}
      loader={<SpinnerBlock />}
      eof
    >
      {isInProgress && (
        <Grid>
          {edges.map((edge) => (
            <Grid.Item key={edge.node.id}>
              <CampaignDigest.Card campaign={edge.node} />
            </Grid.Item>
          ))}
        </Grid>
      )}
      {isInFinished && (
        <List hasBorder>
          {edges.map((edge, i) => (
            <List.Item key={edge.node.id}>
              <CampaignDigest.Feed campaign={edge.node} isFirstFold={i <= 3} />
            </List.Item>
          ))}
        </List>
      )}
    </InfiniteScroll>
  )
}

export default Feed
