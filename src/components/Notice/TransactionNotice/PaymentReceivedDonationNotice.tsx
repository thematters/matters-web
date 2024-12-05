import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ViewerContext } from '~/components/Context'
import { PaymentReceivedDonationNoticeFragment } from '~/gql/graphql'

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

  if (!notice.actors) {
    return null
  }

  const tx = notice.tx
  const hasEthAddress = !!viewer?.info?.ethAddress

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
            {!hasEthAddress && (
              <FormattedMessage
                defaultMessage=", connect your wallet to claim"
                id="CgPGAu"
              />
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
