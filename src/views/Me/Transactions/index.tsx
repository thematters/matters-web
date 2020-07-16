import { useQuery, gql } from '@apollo/client'

import {
  EmptyTransaction,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
  Transaction,
} from '~/components'

import { analytics, mergeConnections } from '~/common/utils'

import { MeTransactions } from './__generated__/MeTransactions'

const ME_TRANSACTIONS = gql`
  query MeTransactions($after: String) {
    viewer {
      id
      wallet {
        transactions(input: { first: 20, after: $after, states: [succeeded] }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...DigestTransaction
            }
          }
        }
      }
    }
  }
  ${Transaction.fragments.transaction}
`

const Transactions = () => {
  const { data, loading, fetchMore, refetch } = useQuery<MeTransactions>(
    ME_TRANSACTIONS
  )

  if (loading) {
    return <Spinner />
  }

  if (!data || !data.viewer) {
    return null
  }

  const connectionPath = 'viewer.wallet.transactions'
  const { edges, pageInfo } = data.viewer.wallet.transactions

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTransaction />
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'transaction',
      location: edges.length,
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {edges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <Transaction tx={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="paymentTransactions" />}
    />

    <Head title={{ id: 'paymentTransactions' }} />

    <Transactions />
  </Layout.Main>
)
