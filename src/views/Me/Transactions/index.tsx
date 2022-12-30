import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyTransaction,
  EmptyTransactionCurrency,
  EmptyTransactionSubscription,
  EmptyTransactionSupport,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
  Tabs,
  Transaction,
  Translate,
} from '~/components'

import { MeTransactions } from './__generated__/MeTransactions'
import { Currency, CurrencySwitch } from './CurrencySwitch'
import styles from './styles.css'

const ME_TRANSACTIONS = gql`
  query MeTransactions(
    $after: String
    $purpose: TransactionPurpose
    $currency: TransactionCurrency
  ) {
    viewer {
      id
      wallet {
        transactions(
          input: {
            first: 20
            after: $after
            filter: {
              states: [canceled, failed, pending, succeeded]
              purpose: $purpose
              currency: $currency
            }
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

export enum Purpose {
  ALL = 'all',
  DONATION = 'donation',
  SUBSCRIPTION = 'subscriptionSplit',
}

interface BaseTransactionsProps {
  currency: Currency
  purpose: Purpose
}

const BaseTransactions = ({ currency, purpose }: BaseTransactionsProps) => {
  const { data, loading, fetchMore, refetch } = useQuery<MeTransactions>(
    ME_TRANSACTIONS,
    {
      variables: {
        currency: currency === Currency.ALL ? undefined : currency,
        purpose: purpose === Purpose.ALL ? undefined : purpose,
      },
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
    if (currency !== Currency.ALL) {
      return <EmptyTransactionCurrency />
    }

    if (purpose === Purpose.DONATION) {
      return <EmptyTransactionSupport />
    }

    if (purpose === Purpose.SUBSCRIPTION) {
      return <EmptyTransactionSubscription />
    }

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
      <style jsx>{styles}</style>
    </InfiniteScroll>
  )
}

const Transactions = () => {
  const [currency, setCurrency] = useState<Currency>(Currency.ALL)
  const [purpose, setPurpose] = useState<Purpose>(Purpose.ALL)

  const isALL = purpose === Purpose.ALL
  const isDonaion = purpose === Purpose.DONATION
  const isSubscription = purpose === Purpose.SUBSCRIPTION

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="paymentTransactions" />}
      />

      <Head title={{ id: 'paymentTransactions' }} />

      <Tabs
        sticky
        side={
          // TODO: hide when purpose is subscription?
          <section className="CurrencySwitch">
            <CurrencySwitch
              currency={currency}
              setCurrency={(c) => setCurrency(c)}
            />
          </section>
        }
      >
        <Tabs.Tab selected={isALL} onClick={() => setPurpose(Purpose.ALL)}>
          <Translate zh_hans="全部" zh_hant="全部" en="All" />
        </Tabs.Tab>

        <Tabs.Tab
          selected={isDonaion}
          onClick={() => setPurpose(Purpose.DONATION)}
        >
          <Translate zh_hans="支持" zh_hant="支持" en="Support" />
        </Tabs.Tab>

        <Tabs.Tab
          selected={isSubscription}
          onClick={() => setPurpose(Purpose.SUBSCRIPTION)}
        >
          <Translate id="subscriptions" />
        </Tabs.Tab>
      </Tabs>
      <BaseTransactions currency={currency} purpose={purpose} />
    </Layout.Main>
  )
}

export default Transactions
