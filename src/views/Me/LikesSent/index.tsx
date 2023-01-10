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
import { MeLikesSentQuery } from '~/gql/graphql'

import LikesTabs from '../LikesTabs'

const ME_LIKES_SENT = gql`
  query MeLikesSent($after: String) {
    viewer {
      id
      activity {
        ...LikesTabsUserActivity
        likesSent: appreciationsSent(input: { first: 20, after: $after }) {
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

const BaseLikesSent = () => {
  const { data, loading, fetchMore, refetch } =
    useQuery<MeLikesSentQuery>(ME_LIKES_SENT)

  if (loading) {
    return <Spinner />
  }

  if (!data?.viewer) {
    return null
  }

  const connectionPath = 'viewer.activity.likesSent'
  const { edges, pageInfo } = data.viewer.activity.likesSent

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
      type: 'appreciations_sent',
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

      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        pullToRefresh={refetch}
      >
        <List>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <Appreciation appreciation={node} type="sent" />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

const LikesSent = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="likesSent" />}
    />

    <Head title={{ id: 'likesSent' }} />

    <BaseLikesSent />
  </Layout.Main>
)

export default LikesSent
