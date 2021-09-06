import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  CircleDigest,
  EmptyWarning,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  Spinner,
  Translate,
} from '~/components'

import { mergeConnections } from '~/common/utils'

import { MeSubscriptionsFeed } from './__generated__/MeSubscriptionsFeed'

const ME_SUBSCRIPTIONS_FEED = gql`
  query MeSubscriptionsFeed($after: String) {
    viewer {
      id
      subscribedCircles(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          node {
            ...DigestMiniCircle
          }
        }
      }
    }
  }
  ${CircleDigest.Mini.fragments.circle}
`

const BaseMeSubscriptions = () => {
  const { data, loading, error, fetchMore } = useQuery<MeSubscriptionsFeed>(
    ME_SUBSCRIPTIONS_FEED
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.subscriptions'
  const { edges, pageInfo } = data?.viewer?.subscribedCircles || {}

  const loadMore = () =>
    fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={
          <Translate
            zh_hant="還沒有訂閱"
            zh_hans="还没有订阅"
            en="No subscriptions"
          />
        }
      />
    )
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder={false}>
        {edges.map(({ node }) => (
          <List.Item key={node.id}>
            <CircleDigest.Mini circle={node} spacing={['base', 'tight']} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeSubscriptions = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="mySubscriptions" />}
    />

    <Head title={{ id: 'mySubscriptions' }} />

    <BaseMeSubscriptions />
  </Layout.Main>
)

export default MeSubscriptions
