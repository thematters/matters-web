import gql from 'graphql-tag'
import React, { useContext } from 'react'

import {
  ArticleDigestTitle,
  Card,
  DateTime,
  IconWalletMedium,
  Translate,
  UserDigest,
  ViewerContext,
} from '~/components'

import { toPath } from '~/common/utils'

import Action from './Action'
import Amount from './Amount'
import Donator from './Donator'
import State from './State'
import styles from './styles.css'

import { DigestTransaction } from './__generated__/DigestTransaction'

interface TransactionProps {
  tx: DigestTransaction
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
      }
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestTitle.fragments.article}
  `,
}

const BaseTransaction = ({ tx }: TransactionProps) => {
  const viewer = useContext(ViewerContext)
  const {
    amount,
    currency,
    purpose,
    sender,
    recipient,
    state,
    target,
    createdAt,
  } = tx

  const isViewerSender = sender && viewer.id === sender.id

  const isAddCredit = purpose === 'addCredit'
  const isRefund = purpose === 'refund'
  const isDonation = purpose === 'donation'
  const isPayout = purpose === 'payout'
  const isWalletAction = isAddCredit || isRefund || isPayout

  const article = target?.__typename === 'Article' && target
  const path = article ? toPath({ page: 'articleDetail', article }) : null

  return (
    <Card {...path} spacing={['base', 'base']}>
      <section className="container">
        <section className="tx-icon">
          {isDonation && (
            <Action
              isSender={!!isViewerSender}
              sender={sender}
              recipient={recipient}
            />
          )}

          {isWalletAction && (
            <section className="wallet">
              <IconWalletMedium size="md" color="green" />
            </section>
          )}
        </section>

        <section className="tx-info">
          <section className="left">
            {isDonation && (
              <Donator user={isViewerSender ? recipient : sender} />
            )}

            {isDonation && article && (
              <section className="title">
                <ArticleDigestTitle article={article} is="h2" />
              </section>
            )}

            {isWalletAction && (
              <section className="wallet-action">
                <p>
                  {isAddCredit && <Translate id="topUp" />}
                  {isRefund && <Translate id="refund" />}
                  {isPayout && <Translate id="paymentPayout" />}
                </p>
              </section>
            )}

            <section>
              <DateTime date={createdAt} color="grey" />
            </section>
          </section>

          <section className="right">
            <Amount amount={amount} currency={currency} state={state} />
            <State state={state} />
          </section>
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
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
