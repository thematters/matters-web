import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

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
  SpinnerBlock,
  SquareTabs,
  Transaction,
} from '~/components'
import { MeTransactionsQuery } from '~/gql/graphql'

import { Currency, CurrencySwitch } from './CurrencySwitch'
import styles from './styles.module.css'

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
  const { data, loading, fetchMore } = useQuery<MeTransactionsQuery>(
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
    return <SpinnerBlock />
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
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore} eof>
      <List>
        {edges.map(({ node, cursor }) => (
          <List.Item key={node.id}>
            <Transaction tx={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const Transactions = () => {
  const [currency, setCurrency] = useState<Currency>(Currency.ALL)
  const [purpose, setPurpose] = useState<Purpose>(Purpose.ALL)

  const isALL = purpose === Purpose.ALL
  const isDonaion = purpose === Purpose.DONATION
  const isSubscription = purpose === Purpose.SUBSCRIPTION

  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        right={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Transactions" id="/jJLYy" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Wallet',
          id: '3yk8fB',
        })}
      />

      <SquareTabs
        sticky
        spacing="md"
        side={
          <section className={styles.currencySwitch}>
            <CurrencySwitch
              currency={currency}
              setCurrency={(c) => setCurrency(c)}
            />
          </section>
        }
      >
        <SquareTabs.Tab
          selected={isALL}
          onClick={() => setPurpose(Purpose.ALL)}
          title={intl.formatMessage({
            defaultMessage: 'All',
            id: '6aE6hr',
            description: 'src/views/Me/Transactions/index.tsx',
          })}
        />

        <SquareTabs.Tab
          selected={isDonaion}
          onClick={() => setPurpose(Purpose.DONATION)}
          title={intl.formatMessage({
            defaultMessage: 'Supports',
            id: 'NCBtyI',
            description: 'src/views/Me/Transactions/index.tsx',
          })}
        />

        <SquareTabs.Tab
          selected={isSubscription}
          onClick={() => setPurpose(Purpose.SUBSCRIPTION)}
          title={intl.formatMessage({
            defaultMessage: 'Subscriptions',
            id: 'T73SwS',
            description: 'src/views/Me/Transactions/index.tsx',
          })}
        />
      </SquareTabs>

      <Layout.Main.Spacing hasVertical={false}>
        <BaseTransactions currency={currency} purpose={purpose} />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Transactions
