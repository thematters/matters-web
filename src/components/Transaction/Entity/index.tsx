import Link from 'next/link'

import { toPath } from '~/common/utils'
import { ArticleDigestTitle, CircleDigest } from '~/components'
import { DigestTransactionFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const Entity = ({ tx }: { tx: DigestTransactionFragment }) => {
  const { target, purpose } = tx
  const article = target?.__typename === 'Article' && target
  const circle = target?.__typename === 'Circle' && target
  const path = article
    ? toPath({ page: 'articleDetail', article })
    : circle
      ? toPath({ page: 'circleDetail', circle })
      : null

  const isDonation = purpose === 'donation'
  const isSubscription = purpose === 'subscriptionSplit'

  return (
    <section className={styles.entity}>
      {isDonation && article && (
        <Link {...path!}>
          <section className={styles.title}>
            <ArticleDigestTitle
              article={article}
              is="h2"
              textWeight="normal"
              textSize={12}
            />
          </section>
        </Link>
      )}

      {isSubscription && circle && (
        <Link {...path!}>
          <section className={`${styles.title} ${styles.circleTitle}`}>
            <CircleDigest.Title
              circle={circle}
              is="h2"
              textWeight="normal"
              textSize={12}
            />
          </section>
        </Link>
      )}
    </section>
  )
}

export default Entity
