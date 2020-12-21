import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticle from '../NoticeArticle'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

import { PaymentReceivedDonationNotice as NoticeType } from './__generated__/PaymentReceivedDonationNotice'

const PaymentReceivedDonationNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const tx = notice.tx
  const actor = notice.actors[0]

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <NoticeActorName user={actor} />{' '}
          <Translate zh_hant="支持了你的作品 " zh_hans="支持了你的作品 " />
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
    fragment PaymentReceivedDonationNotice on TransactionNotice {
      id
      ...NoticeHead
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
