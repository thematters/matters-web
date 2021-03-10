import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
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
        <NoticeHead>
          <NoticeActorName user={actor} />{' '}
          <Translate
            zh_hant="支持了你的作品 "
            zh_hans="支持了你的作品 "
            en="supported your work"
          />
          {tx && (
            <span className="highlight">
              {tx.amount} {tx.currency}
            </span>
          )}
          <Translate
            zh_hant="，快去查看自己的收入吧！"
            zh_hans="，快去查看自己的收入吧！"
            en=", take a look at your income!"
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
