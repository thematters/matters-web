import Link from 'next/link'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Button, toast, useMutation, ViewerContext } from '~/components'
import { DELETE_QUOTE } from '~/components/GQL/mutations/putQuote'
import { DeleteQuoteMutation, QuoteWallQuoteFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface QuoteCardProps {
  quote: QuoteWallQuoteFragment
  // index drives the rotation / background variety on the wall
  index?: number
  afterRetract?: () => void
}

const QuoteCard = ({ quote, index = 0, afterRetract }: QuoteCardProps) => {
  const viewer = useContext(ViewerContext)
  const [deleteQuote] = useMutation<DeleteQuoteMutation>(DELETE_QUOTE)
  const [confirming, setConfirming] = useState(false)
  const [retracted, setRetracted] = useState(false)

  // the poster, or the source article's author (the words are theirs), may retract
  const canRetract =
    !!viewer.id &&
    (viewer.id === quote.poster.id || viewer.id === quote.article.author.id)

  const path = toPath({ page: 'articleDetail', article: quote.article })

  const onRetract = async () => {
    try {
      await deleteQuote({ variables: { input: { id: quote.id } } })
      setRetracted(true)
      toast.info({
        message: (
          <FormattedMessage
            defaultMessage="Quote retracted from the wall"
            id="QuoteWall.retracted"
          />
        ),
      })
      afterRetract?.()
    } catch {
      toast.error({
        message: (
          <FormattedMessage defaultMessage="Failed to retract" id="QuoteWall.retractFailed" />
        ),
      })
    }
  }

  if (retracted) {
    return null
  }

  return (
    <figure className={styles.card} data-variant={index % 4}>
      <Link {...path} className={styles.quoteLink}>
        <blockquote className={styles.quote}>{quote.content}</blockquote>
      </Link>

      <figcaption className={styles.meta}>
        <span className={styles.author}>
          — {quote.article.author.userName}
          {quote.article.title ? `《${quote.article.title}》` : ''}
        </span>
        <Link {...path} className={styles.back}>
          <FormattedMessage defaultMessage="To article ↩" id="QuoteWall.toArticle" />
        </Link>
      </figcaption>

      {canRetract &&
        (confirming ? (
          <span className={styles.retractRow}>
            <Button textColor="grey" onClick={() => setConfirming(false)}>
              <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
            </Button>
            <Button textColor="red" onClick={onRetract}>
              <FormattedMessage defaultMessage="Confirm retract" id="QuoteWall.confirmRetract" />
            </Button>
          </span>
        ) : (
          <Button
            textColor="grey"
            spacing={[0, 0]}
            onClick={() => setConfirming(true)}
          >
            <FormattedMessage defaultMessage="Retract" id="QuoteWall.retract" />
          </Button>
        ))}
    </figure>
  )
}

export default QuoteCard
