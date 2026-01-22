import gql from 'graphql-tag'
import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS, URL_ME_WALLET } from '~/common/enums'
import { ViewerContext } from '~/components/Context'
import {
  PaymentReceivedDonationFragment,
  TransactionCurrency,
} from '~/gql/graphql'

import ActorAction from '../ActorAction'
import ArticleCard from '../ArticleCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'
import styles from './styles.module.css'

const PaymentReceivedDonation = ({
  notice,
}: {
  notice: PaymentReceivedDonationFragment
}) => {
  const viewer = useContext(ViewerContext)

  const tx = notice.tx
  const hasEthAddress = !!viewer?.info?.ethAddress
  const isHKD = tx?.currency === TransactionCurrency.Hkd
  const isLIKE = tx?.currency === TransactionCurrency.Like
  const isUSDT = tx?.currency === TransactionCurrency.Usdt
  const canWithdraw = isUSDT && !hasEthAddress

  const amountStyles = isHKD
    ? [styles.amount, styles.hkd]
    : isLIKE
      ? [styles.amount, styles.like]
      : isUSDT
        ? [styles.amount, styles.usdt]
        : []

  return (
    <NoticeCard
      notice={notice}
      type="transaction"
      action={
        <FormattedMessage
          defaultMessage="supported"
          id="vLEnrs"
          description="src/components/Notice/TransactionNotice/PaymentReceivedDonationNotice.tsx"
        />
      }
      content={
        (tx && tx.target?.__typename === 'Article' && (
          <>
            <ArticleCard article={tx.target} />
            {canWithdraw ? (
              <Link
                className={amountStyles.join(' ')}
                href={`${PATHS.ME_WALLET}?${URL_ME_WALLET.OPEN_WITHDRAW_VAULT_USDT_DIALOG.key}=${URL_ME_WALLET.OPEN_WITHDRAW_VAULT_USDT_DIALOG.value}`}
              >
                <span>
                  {tx.amount} {tx.currency}
                </span>
                <div className={styles.divider} />
                <span>
                  <FormattedMessage
                    defaultMessage="Claim for free"
                    id="KkMtuC"
                    description="src/components/Notice/TransactionNotice/PaymentReceivedDonationNotice.tsx"
                  />
                </span>
              </Link>
            ) : (
              <section className={amountStyles.join(' ')}>
                {tx.amount} {tx.currency}
              </section>
            )}
          </>
        )) ||
        ''
      }
    />
  )
}

PaymentReceivedDonation.fragments = {
  notice: gql`
    fragment PaymentReceivedDonation on TransactionNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      tx: target {
        id
        amount
        currency
        target {
          __typename
          ... on Article {
            ...NoticeArticleCard
            ...ArticleCardArticle
          }
        }
      }
    }
    ${NoticeDate.fragments.notice}
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeArticleCard.fragments.article}
    ${ArticleCard.fragments.article}
  `,
}

export default PaymentReceivedDonation
