import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { PaymentPayoutNoticeFragment } from '~/gql/graphql'

import NoticeDate from '../NoticeDate'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const PaymentPayoutNotice = ({
  notice,
}: {
  notice: PaymentPayoutNoticeFragment
}) => {
  const tx = notice.tx

  return (
    <section className="container" data-test-id={TEST_ID.PAYMENT_PAYOUT}>
      <section className="avatar-wrap">
        <NoticeTypeIcon type="volume" />
      </section>

      <section className="content-wrap">
        <p>
          <FormattedMessage
            defaultMessage="Your"
            description="src/components/Notice/TransactionNotice/PaymentPayoutNotice.tsx"
          />
          {tx && (
            <span className="highlight">
              {tx.amount} {tx.currency}
            </span>
          )}
          <FormattedMessage
            defaultMessage="withdrawal process has started. Please refer to your bank for payout status."
            description="src/components/Notice/TransactionNotice/PaymentPayoutNotice.tsx"
          />
        </p>

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

PaymentPayoutNotice.fragments = {
  notice: gql`
    fragment PaymentPayoutNotice on TransactionNotice {
      id
      ...NoticeDate
      tx: target {
        id
        amount
        currency
      }
    }
    ${NoticeDate.fragments.notice}
  `,
}

export default PaymentPayoutNotice
