import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

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

import { Currency, CurrencySwitch } from './CurrencySwitch'
import styles from './styles.css'

import { TransactionCurrency } from '@/__generated__/globalTypes'
import { MeTransactions } from './__generated__/MeTransactions'

const ME_TRANSACTIONS = gql`
  query MeTransactions($after: String) {
    viewer {
      id
      wallet {
        transactions(
          input: {
            first: 20
            after: $after
            states: [canceled, failed, pending, succeeded]
          }
        ) {
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

const BaseTransactions = () => {
  const [currencyType, setCurrencyType] = useState<Currency>(Currency.ALL)
  const { data, loading, fetchMore, refetch } = useQuery<MeTransactions>(
    ME_TRANSACTIONS,
    {
      fetchPolicy: 'network-only',
    }
  )

  if (loading) {
    return <Spinner />
  }

  if (!data?.viewer) {
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
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  let filteredEdges = edges
  if (currencyType === Currency.HKD) {
    filteredEdges = edges.filter(
      (e) => e.node.currency === TransactionCurrency.HKD
    )
  }

  if (currencyType === Currency.LIKE) {
    filteredEdges = edges.filter(
      (e) => e.node.currency === TransactionCurrency.LIKE
    )
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <section className="CurrencySwitch">
        <CurrencySwitch
          currency={currencyType}
          setCurrency={(c) => setCurrencyType(c)}
        />
      </section>

      <List>
        {filteredEdges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <Transaction tx={node} />
          </List.Item>
        ))}
      </List>
      <style jsx>{styles}</style>
    </InfiniteScroll>
  )
}

const Transactions = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="paymentTransactions" />}
    />

    <Head title={{ id: 'paymentTransactions' }} />

    <BaseTransactions />
  </Layout.Main>
)

export default Transactions
