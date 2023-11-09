import gql from 'graphql-tag'

import { TransactionNoticeFragment } from '~/gql/graphql'

import PaymentReceivedDonationNotice from './PaymentReceivedDonationNotice'

const TransactionNotice = ({
  notice,
}: {
  notice: TransactionNoticeFragment
}) => {
  switch (notice.txNoticeType) {
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
      ...PaymentReceivedDonationNotice
    }
    ${PaymentReceivedDonationNotice.fragments.notice}
  `,
}

export default TransactionNotice
