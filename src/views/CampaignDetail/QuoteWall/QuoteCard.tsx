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
  afterRetract?: () => void
}

const QuoteCard = ({ quote, afterRetract }: QuoteCardProps) => {
  const viewer = useContext(ViewerContext)
  const [deleteQuote] = useMutation<DeleteQuoteMutation>(DELETE_QUOTE)
  const [confirming, setConfirming] = useState(false)
  const [retracted, setRetracted] = useState(false)

  // retract is staff-only (site admin); posters/authors cannot self-retract
  const canRetract = !!viewer.isAdmin

  const path = toPath({ page: 'articleDetail', article: quote.article })

  const onRetract = async () => {
    try {
      // deleteQuote returns a bare boolean, so Apollo can't evict the quote on
      // its own; refetch every CampaignQuotes observer (band + dialog) so the
      // retracted quote and the quoteCount reconcile across the page
      await deleteQuote({
        variables: { input: { id: quote.id } },
        refetchQueries: ['CampaignQuotes'],
      })
      setRetracted(true)
      toast.info({
        message: (
          <FormattedMessage
            defaultMessage="Quote retracted from the wall"
            id="TIWVxK"
          />
        ),
      })
      afterRetract?.()
    } catch {
      toast.error({
        message: (
          <FormattedMessage defaultMessage="Failed to retract" id="iSjuti" />
        ),
      })
    }
  }

  if (retracted) {
    return null
  }

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

      {canRetract && (
        <div className={styles.retractRow}>
          {confirming ? (
            <>
              <Button textColor="grey" onClick={() => setConfirming(false)}>
                <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
              </Button>
              <Button textColor="red" onClick={onRetract}>
                <FormattedMessage
                  defaultMessage="Confirm retract"
                  id="Z82+dw"
                />
              </Button>
            </>
          ) : (
            <Button
              textColor="grey"
              spacing={[0, 0]}
              onClick={() => setConfirming(true)}
            >
              <FormattedMessage defaultMessage="Retract" id="3jmniZ" />
            </Button>
          )}
        </div>
      )}
    </figure>
  )
}

export default QuoteCard
