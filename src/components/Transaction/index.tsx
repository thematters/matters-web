import gql from 'graphql-tag'
import React, { useContext } from 'react'

import { TEST_ID } from '~/common/enums'
import { DateTime, ViewerContext } from '~/components'
import { ArticleDigestTitle } from '~/components/ArticleDigest'
import { CircleDigest } from '~/components/CircleDigest'
import { UserDigest } from '~/components/UserDigest'
import { DigestTransactionFragment } from '~/gql/graphql'

import Amount from './Amount'
import Donator from './Donator'
import Entity from './Entity'
import PurposeTitle from './PurposeTitle'
import State from './State'
import styles from './styles.module.css'

interface TransactionProps {
  tx: DigestTransactionFragment
}

const fragments = {
  transaction: gql`
    fragment DigestTransaction on Transaction {
      id
      state
      purpose
      amount
      fee
      currency
      createdAt
      recipient {
        ...UserDigestMiniUser
      }
      sender {
        ...UserDigestMiniUser
      }
      target {
        ... on Article {
          ...ArticleDigestTitleArticle
        }
        ... on Circle {
          ...DigestPlainCircle
        }
      }
      message
      blockchainTx {
        chain
        txHash
      }
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestTitle.fragments.article}
    ${CircleDigest.Plain.fragments.circle}
  `,
}

const BaseTransaction = ({ tx }: TransactionProps) => {
  const viewer = useContext(ViewerContext)
  const {
    purpose,
    sender,
    recipient,
    state,
    message,
    createdAt,
    blockchainTx,
  } = tx

  const isViewerSender = sender && viewer.id === sender.id
  const isDonation = purpose === 'donation'
  const isSubscription = purpose === 'subscriptionSplit'
  const useUserHeader = isSubscription || isDonation

  return (
    <section
      className={styles.transaction}
      data-test-id={TEST_ID.ME_WALLET_TRANSACTIONS_ITEM}
    >
      <header className={styles.header}>
        {useUserHeader ? (
          <Donator user={isViewerSender ? recipient : sender} />
        ) : (
          <PurposeTitle tx={tx} />
        )}

        <Amount tx={tx} testId={TEST_ID.ME_WALLET_TRANSACTIONS_ITEM_AMOUNT} />
      </header>

      <Entity tx={tx} />

      <footer className={styles.footer}>
        <DateTime date={createdAt} />
        <State state={state} message={message} blockchainTx={blockchainTx} />
      </footer>
    </section>
  )
}

/**
 * Memoizing
 */
type MemoizedTransactionType = React.MemoExoticComponent<
  React.FC<TransactionProps>
> & {
  fragments: typeof fragments
}

export const MemoizedTransaction = React.memo(
  BaseTransaction,
  () => true
) as MemoizedTransactionType

MemoizedTransaction.fragments = fragments

export const Transaction = MemoizedTransaction
