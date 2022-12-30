import gql from 'graphql-tag'

import { TransactionNoticeFragment } from '~/gql/graphql'

import PaymentPayoutNotice from './PaymentPayoutNotice'
import PaymentReceivedDonationNotice from './PaymentReceivedDonationNotice'

const TransactionNotice = ({
  notice,
}: {
  notice: TransactionNoticeFragment
}) => {
  switch (notice.txNoticeType) {
    case 'PaymentPayout':
      return <PaymentPayoutNotice notice={notice} />
    case 'PaymentReceivedDonation':
      return <PaymentReceivedDonationNotice notice={notice} />
    default:
      return null
  }
}

TransactionNotice.fragments = {
  notice: gql`
    fragment TransactionNotice on TransactionNotice {
      id
      unread
      __typename
      txNoticeType: type
      ...PaymentPayoutNotice
      ...PaymentReceivedDonationNotice
    }
    ${PaymentPayoutNotice.fragments.notice}
    ${PaymentReceivedDonationNotice.fragments.notice}
  `,
}

export default TransactionNotice
