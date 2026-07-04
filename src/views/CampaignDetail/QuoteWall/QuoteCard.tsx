import Link from 'next/link'

import { toPath } from '~/common/utils'
import { QuoteWallQuoteFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface QuoteCardProps {
  quote: QuoteWallQuoteFragment
}

// display-only card; quote moderation (retract) lives in the OSS admin console
const QuoteCard = ({ quote }: QuoteCardProps) => {
  const path = toPath({ page: 'articleDetail', article: quote.article })

  return (
    <figure className={styles.card}>
      {/* stretched link: the whole card navigates to the source article */}
      <Link {...path} className={styles.cardLink}>
        <blockquote className={styles.quote}>{quote.content}</blockquote>
      </Link>

      <figcaption className={styles.meta}>
        <span className={styles.author}>
          — {quote.article.author.userName}
          {quote.article.title ? `《${quote.article.title}》` : ''}
        </span>
      </figcaption>
    </figure>
  )
}

export default QuoteCard
