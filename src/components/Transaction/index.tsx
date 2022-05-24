import gql from 'graphql-tag'
import React, { useContext } from 'react'

import {
  // ArticleDigestTitle,
  Card,
  // CircleDigest,
  DateTime,
  Translate,
  // UserDigest,
  ViewerContext,
} from '~/components'
import { ArticleDigestTitle } from '~/components/ArticleDigest'
import { CircleDigest } from '~/components/CircleDigest'
import { UserDigest } from '~/components/UserDigest'

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
        ... on Circle {
          ...DigestPlainCircle
        }
      }
      message
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestTitle.fragments.article}
    ${CircleDigest.Plain.fragments.circle}
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
    message,
    createdAt,
  } = tx

  const isViewerSender = sender && viewer.id === sender.id
  const isViewerRecipient = recipient && viewer.id === recipient.id

  const isAddCredit = purpose === 'addCredit'
  const isRefund = purpose === 'refund'
  const isDonation = purpose === 'donation'
  const isPayout = purpose === 'payout'
  const isSubscription = purpose === 'subscriptionSplit'
  const isWalletAction = isAddCredit || isRefund || isPayout

  const article = target?.__typename === 'Article' && target
  const circle = target?.__typename === 'Circle' && target
  const path = article
    ? toPath({ page: 'articleDetail', article })
    : circle
    ? toPath({ page: 'circleDetail', circle })
    : null

  return (
    <Card {...path} spacing={['base', 'base']}>
      <section className="container">
        <section className="tx-icon">
          <Action
            isSender={!!isViewerSender}
            isSubscription={isSubscription}
            isWalletAction={isWalletAction}
            sender={sender}
            recipient={recipient}
          />
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

            {isSubscription && circle && (
              <>
                <section className="subscription">
                  <p>
                    {isViewerRecipient && (
                      <Translate zh_hant="圍爐營收" zh_hans="围炉营收" />
                    )}
                    {isViewerSender && (
                      <Translate zh_hant="圍爐訂閱" zh_hans="围炉订阅" />
                    )}
                  </p>
                </section>
                <section className="title">
                  <CircleDigest.Title circle={circle} is="h2" />
                </section>
              </>
            )}

            <section>
              <DateTime date={createdAt} />
            </section>
          </section>

          <section className="right">
            <Amount amount={amount} currency={currency} state={state} />
            <State state={state} message={message} />
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
