import gql from 'graphql-tag'
import React from 'react'

import {
  ArticleDigestTitle,
  Card,
  DateTime,
  TextIcon,
  Translate,
  UserDigest,
} from '~/components'

import { numFormat, toPath } from '~/common/utils'

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
  const { amount, currency, purpose, recipient, target, createdAt } = tx

  const isAddCredit = purpose === 'addCredit'
  // const isRefund = purpose === 'refund'
  const isDonation = purpose === 'donation'

  const content = <Translate id={isAddCredit ? 'topUp' : 'refund'} />

  const article = target?.__typename === 'Article' && target
  const path = article ? toPath({ page: 'articleDetail', article }) : null

  return (
    <Card {...path} spacing={['base', 'base']}>
      <section className="container">
        <section className="left">
          <header>
            {content && <h4 className="content">{content}</h4>}
            {article && <ArticleDigestTitle article={article} is="h2" />}
          </header>

          <footer>
            {isDonation && recipient && (
              <UserDigest.Mini
                user={recipient}
                avatarSize="xs"
                hasAvatar
                hasDisplayName
                hasUserName
              />
            )}
          </footer>
        </section>

        <section className="right">
          <div className="num">
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
              {numFormat(Math.abs(amount))}
            </TextIcon>
          </div>

          <DateTime date={createdAt} />
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
