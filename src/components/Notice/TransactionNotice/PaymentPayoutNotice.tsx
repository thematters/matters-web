import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { Translate } from '~/components'

import NoticeDate from '../NoticeDate'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'
import { PaymentPayoutNotice as NoticeType } from './__generated__/PaymentPayoutNotice'

const PaymentPayoutNotice = ({ notice }: { notice: NoticeType }) => {
  const tx = notice.tx

  return (
    <section className="container" data-test-id={TEST_ID.PAYMENT_PAYOUT}>
      <section className="avatar-wrap">
        <NoticeTypeIcon type="volume" />
      </section>

      <section className="content-wrap">
        <p>
          <Translate zh_hant="你的 " zh_hans="你的 " en="Your " />
          {tx && (
            <span className="highlight">
              {tx.amount} {tx.currency}
            </span>
          )}
          <Translate
            zh_hant={' 提現流程已開始，到帳時間請關注銀行提醒。'}
            zh_hans={' 提现流程已开始，到帐时间请关注银行提醒。'}
            en={
              ' withdrawal process has started. Please refer to your bank for payout status.'
            }
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
