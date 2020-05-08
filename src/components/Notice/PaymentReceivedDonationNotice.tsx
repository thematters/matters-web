import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeHead from './NoticeHead'
import styles from './styles.css'

import { PaymentReceivedDonationNotice as NoticeType } from './__generated__/PaymentReceivedDonationNotice'

const PaymentReceivedDonationNotice = ({ notice }: { notice: NoticeType }) => {
  const tx = notice.target

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={notice.actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <NoticeActorName user={notice.actor} />{' '}
          <Translate zh_hant="支持了你 " zh_hans="支持了你 " />
          {tx && (
            <span className="highlight">
              {tx.amount} {tx.currency}
            </span>
          )}
          <Translate
            zh_hant="，快去查看自己的收入吧！"
            zh_hans="，快去查看自己的收入吧！"
          />
        </NoticeHead>

        {tx && tx.target?.__typename === 'Article' && (
          <NoticeArticle article={tx.target} isBlock />
        )}
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

PaymentReceivedDonationNotice.fragments = {
  notice: gql`
    fragment PaymentReceivedDonationNotice on PaymentReceivedDonationNotice {
      id
      unread
      __typename
      ...NoticeHead
      actor {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        id
        amount
        currency
        target {
          __typename
          ... on Article {
            ...NoticeArticle
          }
        }
      }
    }
    ${NoticeHead.fragments.date}
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
  `,
}

export default PaymentReceivedDonationNotice
