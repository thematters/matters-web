import gql from 'graphql-tag'

import { TransactionNoticeFragment } from '~/gql/graphql'

import PaymentReceivedDonation from './PaymentReceivedDonation'
import WithdrewLockedTokens from './WithdrewLockedTokens'

const TransactionNotice = ({
  notice,
}: {
  notice: TransactionNoticeFragment
}) => {
  switch (notice.txNoticeType) {
    case 'PaymentReceivedDonation':
      return <PaymentReceivedDonation notice={notice} />
    case 'WithdrewLockedTokens':
      return <WithdrewLockedTokens notice={notice} />
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
      ...PaymentReceivedDonation
      ...WithdrewLockedTokens
    }
    ${PaymentReceivedDonation.fragments.notice}
    ${WithdrewLockedTokens.fragments.notice}
  `,
}

export default TransactionNotice
