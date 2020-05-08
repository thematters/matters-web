import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeDate from './NoticeDate'
import NoticeTypeIcon from './NoticeTypeIcon'
import styles from './styles.css'

import { PaymentPayoutNotice as NoticeType } from './__generated__/PaymentPayoutNotice'

const PaymentPayoutNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="volume" />
      </section>

      <section className="content-wrap">
        <p>
          <Translate zh_hant="你的 " zh_hans="你的 " />
          {notice.target && `${notice.target.amount} ${notice.target.currency}`}
          <Translate
            zh_hant={' 提現流程已開始，到帳時間請關注銀行提醒。'}
            zh_hans={' 提现流程已开始，到帐时间请关注银行提醒。'}
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
    fragment PaymentPayoutNotice on PaymentPayoutNotice {
      id
      unread
      __typename
      ...NoticeDate
      target {
        id
        amount
        currency
      }
    }
    ${NoticeDate.fragments.notice}
  `,
}

export default PaymentPayoutNotice
