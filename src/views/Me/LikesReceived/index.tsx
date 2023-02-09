import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { analytics, mergeConnections } from '~/common/utils'
import {
  Appreciation,
  EmptyAppreciation,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
} from '~/components'
import { MeLikesReceivedQuery } from '~/gql/graphql'

import LikesTabs from '../LikesTabs'

const ME_APPRECIATED_RECEIVED = gql`
  query MeLikesReceived($after: String) {
    viewer {
      id
      activity {
        ...LikesTabsUserActivity
        likesReceived: appreciationsReceived(
          input: { first: 20, after: $after }
        ) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...DigestAppreciation
            }
          }
        }
      }
    }
  }
  ${Appreciation.fragments.appreciation}
  ${LikesTabs.fragments.userActivity}
`

const BaseLikesReceived = () => {
  const { data, loading, fetchMore } = useQuery<MeLikesReceivedQuery>(
    ME_APPRECIATED_RECEIVED
  )

  if (loading) {
    return <Spinner />
  }

  if (!data?.viewer) {
    return null
  }

  const connectionPath = 'viewer.activity.likesReceived'
  const { edges, pageInfo } = data.viewer.activity.likesReceived

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <LikesTabs activity={data.viewer.activity} />
        <EmptyAppreciation />
      </>
    )
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'appreciations_received',
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <>
      <LikesTabs activity={data.viewer.activity} />

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <Appreciation appreciation={node} type="received" />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

const LikesReceived = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="likesReceived" />}
    />

    <Head title={{ id: 'likesReceived' }} />

    <BaseLikesReceived />
  </Layout.Main>
)

export default LikesReceived
