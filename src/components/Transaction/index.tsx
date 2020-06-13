import classNames from 'classnames'
import gql from 'graphql-tag'
import React, { useContext } from 'react'

import {
  ArticleDigestTitle,
  Card,
  DateTime,
  TextIcon,
  Translate,
  UserDigest,
  ViewerContext,
} from '~/components'

import { toAmountString, toPath } from '~/common/utils'

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
    target,
    createdAt,
    state: txState,
  } = tx

  const isViewerSender = sender && viewer.id === sender.id

  const isAddCredit = purpose === 'addCredit'
  const isRefund = purpose === 'refund'
  const isDonation = purpose === 'donation'
  const isPayout = purpose === 'payout'
  const isPending = txState === 'pending'
  const showContent = isAddCredit || isRefund || isPayout

  const article = target?.__typename === 'Article' && target
  const path = article ? toPath({ page: 'articleDetail', article }) : null

  return (
    <Card {...path} spacing={['base', 'base']}>
      <section className="container">
        <section
          className={classNames({
            left: true,
            pending: isPending,
          })}
        >
          {showContent && (
            <section className="content">
              <p>
                {isAddCredit && <Translate id="topUp" />}
                {isRefund && <Translate id="refund" />}
                {isPayout && <Translate id="paymentPayout" />}
              </p>
            </section>
          )}

          {isDonation && !isViewerSender && sender && (
            <header className="sender">
              <UserDigest.Mini
                user={sender}
                avatarSize="xs"
                hasAvatar
                hasDisplayName
              />
              <span>
                &nbsp;
                <Translate zh_hant="支持了" zh_hans="支持了" />
              </span>
            </header>
          )}

          {isDonation && article && (
            <section>
              <ArticleDigestTitle article={article} is="h2" />
            </section>
          )}

          {isDonation && isViewerSender && recipient && (
            <footer>
              <UserDigest.Mini
                user={recipient}
                avatarSize="xs"
                hasAvatar
                hasDisplayName
                hasUserName
              />
            </footer>
          )}
        </section>

        <section className="right">
          <div
            className={classNames({
              num: true,
              pending: isPending,
            })}
          >
            <TextIcon
              spacing="xtight"
              size="sm"
              weight="md"
              color={amount > 0 ? 'green' : 'red'}
            >
              {amount > 0 ? '+' : '-'}
              &nbsp;
              {currency}
              &nbsp;
              {toAmountString(Math.abs(amount))}
            </TextIcon>
          </div>

          {isPending ? (
            <span className="pending-timestamp">
              <Translate zh_hant="進行中" zh_hans="进行中" />
            </span>
          ) : (
            <DateTime date={createdAt} />
          )}
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoedTransactionType = React.MemoExoticComponent<
  React.FC<TransactionProps>
> & {
  fragments: typeof fragments
}

export const MemoedTransaction = React.memo(
  BaseTransaction,
  () => true
) as MemoedTransactionType

MemoedTransaction.fragments = fragments

export const Transaction = MemoedTransaction
