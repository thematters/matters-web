import gql from 'graphql-tag'
import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS, TEST_ID, URL_ME_WALLET } from '~/common/enums'
import { ViewerContext } from '~/components/Context'
import {
  PaymentReceivedDonationNoticeFragment,
  TransactionCurrency,
} from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'

const PaymentReceivedDonationNotice = ({
  notice,
}: {
  notice: PaymentReceivedDonationNoticeFragment
}) => {
  const viewer = useContext(ViewerContext)

  const tx = notice.tx
  const hasEthAddress = !!viewer?.info?.ethAddress
  const isUSDT = tx?.currency === TransactionCurrency.Usdt

  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="supported"
          id="vLEnrs"
          description="src/components/Notice/TransactionNotice/PaymentReceivedDonationNotice.tsx"
        />
      }
      title={
        (tx && tx.target?.__typename === 'Article' && (
          <>
            <NoticeArticleTitle article={tx.target} />
            &nbsp;
            <span
              className="u-highlight"
              data-test-id={TEST_ID.NOTICE_PAYMENT_RECEIVE_DONATION_AMOUNT}
            >
              {tx.amount} {tx.currency}
            </span>
            {isUSDT && !hasEthAddress && (
              <Link
                href={`${PATHS.ME_WALLET}?${URL_ME_WALLET.OPEN_WITHDRAW_VAULT_USDT_DIALOG.key}=${URL_ME_WALLET.OPEN_WITHDRAW_VAULT_USDT_DIALOG.value}`}
              >
                <FormattedMessage
                  defaultMessage=", connect your wallet to claim"
                  id="CgPGAu"
                />
              </Link>
            )}
          </>
        )) ||
        ''
      }
      testId={TEST_ID.NOTICE_PAYMENT_RECEIVE_DONATION}
    />
  )
}

PaymentReceivedDonationNotice.fragments = {
  notice: gql`
    fragment PaymentReceivedDonationNotice on TransactionNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      tx: target {
        id
        amount
        currency
        target {
          __typename
          ... on Article {
            ...NoticeArticleCard
          }
        }
      }
    }
    ${NoticeDate.fragments.notice}
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleCard.fragments.article}
  `,
}

export default PaymentReceivedDonationNotice
