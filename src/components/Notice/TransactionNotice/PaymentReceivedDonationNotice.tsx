import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { PaymentReceivedDonationNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

const PaymentReceivedDonationNotice = ({
  notice,
}: {
  notice: PaymentReceivedDonationNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const tx = notice.tx
  const actor = notice.actors[0]

  return (
    <section
      className="container"
      data-test-id={TEST_ID.PAYMENT_RECEIVE_DONATION}
    >
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeActorName user={actor} />
          <FormattedMessage
            defaultMessage="supported your article"
            description="src/components/Notice/TransactionNotice/PaymentReceivedDonationNotice.tsx"
          />
          {tx && (
            <span
              className="highlight"
              data-test-id={TEST_ID.PAYMENT_RECEIVE_DONATION_AMOUNT}
            >
              {tx.amount} {tx.currency}
            </span>
          )}
          <FormattedMessage
            defaultMessage=". Take a look at your income"
            description="src/components/Notice/TransactionNotice/PaymentReceivedDonationNotice.tsx"
          />
        </NoticeHead>

        {tx && tx.target?.__typename === 'Article' && (
          <NoticeArticleCard article={tx.target} />
        )}

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
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
