import gql from 'graphql-tag'

import { TransactionNoticeFragment } from '~/gql/graphql'

import PaymentReceivedDonationNotice from './PaymentReceivedDonationNotice'
import WithdrewLockedTokensNotice from './WithdrewLockedTokensNotice'

const TransactionNotice = ({
  notice,
}: {
  notice: TransactionNoticeFragment
}) => {
  switch (notice.txNoticeType) {
    case 'PaymentReceivedDonation':
      return <PaymentReceivedDonationNotice notice={notice} />
    case 'WithdrewLockedTokens':
      return <WithdrewLockedTokensNotice notice={notice} />
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
      ...WithdrewLockedTokensNotice
    }
    ${PaymentReceivedDonationNotice.fragments.notice}
    ${WithdrewLockedTokensNotice.fragments.notice}
  `,
}

export default TransactionNotice
