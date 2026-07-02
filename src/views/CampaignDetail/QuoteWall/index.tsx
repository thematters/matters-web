import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS } from '~/common/enums'
import { Button, TextIcon, usePublicQuery, ViewerContext } from '~/components'
import { CampaignQuotesQuery } from '~/gql/graphql'

import QuoteWallDialog from './Dialog'
import { CAMPAIGN_QUOTES } from './gql'
import QuoteCard from './QuoteCard'
import styles from './styles.module.css'

type QuotesConnection = NonNullable<
  NonNullable<CampaignQuotesQuery['campaign']>['quotes']
>
type Quote = NonNullable<QuotesConnection['edges']>[0]['node']

// how many quotes to preview in the compact module
const PREVIEW_COUNT = 3

interface QuoteWallProps {
  shortHash: string
  // 'band': horizontal pull-quote band in the centre column (Option A, every
  // viewport). 'module': compact wall (legacy desktop right aside). 'chip':
  // one-line entry (legacy mobile) that opens the full wall dialog.
  entry?: 'module' | 'chip' | 'band'
}

const QuoteWall = ({ shortHash, entry = 'module' }: QuoteWallProps) => {
  const viewer = useContext(ViewerContext)

  const { data } = usePublicQuery<CampaignQuotesQuery>(
    CAMPAIGN_QUOTES,
    // newest-first: show the most recently posted quotes (random off → the
    // backend orders by id desc)
    { variables: { shortHash, first: PREVIEW_COUNT, random: false } },
    { publicQuery: !viewer.isAuthed }
  )

  const campaign =
    data?.campaign?.__typename === 'WritingChallenge'
      ? data.campaign
      : undefined
  const totalCount = campaign?.quoteCount ?? 0
  const enableQuoteWall = campaign?.enableQuoteWall ?? false
  const quotes: Quote[] = (campaign?.quotes?.edges || [])
    .map(({ node }) => node)
    .slice(0, PREVIEW_COUNT)

  // the centre-column band keeps showing even when the wall is still empty (as
  // a prompt to post the first quote), as long as the campaign has the wall
  // enabled; the legacy module/chip entries still hide when empty
  const showEmptyBand = entry === 'band' && enableQuoteWall
  if (totalCount <= 0 && !showEmptyBand) {
    return null
  }

  // mobile: one-line entry that opens the full wall dialog
  if (entry === 'chip') {
    return (
      <QuoteWallDialog shortHash={shortHash} totalCount={totalCount}>
        {({ openDialog }) => (
          <button
            type="button"
            className={styles.chip}
            onClick={openDialog}
            aria-haspopup="dialog"
          >
            <span>
              <FormattedMessage defaultMessage="Quote wall" id="1HLo+Y" />
              <span className={styles.count}>{totalCount}</span>
            </span>
            <span className={styles.chevron}>›</span>
          </button>
        )}
      </QuoteWallDialog>
    )
  }

  // centre-column pull-quote band (Option A): a horizontal, scrollable strip
  // between the campaign header and the article feed, on every viewport
  if (entry === 'band') {
    return (
      <section className={styles.band}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <FormattedMessage defaultMessage="Quote wall" id="1HLo+Y" />
          </h2>
          <a
            className={styles.viewAllLink}
            href={EXTERNAL_LINKS.SEVEN_DAY_BOOK_QUOTE_WALL}
            target="_blank"
            rel="noreferrer"
          >
            <FormattedMessage defaultMessage="See all quotes" id="bv9UzQ" />
          </a>
        </header>

        {quotes.length > 0 ? (
          <div className={styles.bandRow}>
            {quotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
        ) : (
          // "invitation card": same shape as a real quote card (left green
          // rule) so the wall keeps its card feel without showing a fake quote
          <div className={styles.inviteCard}>
            <p className={styles.inviteText}>
              <span className={styles.spark}>✦</span>
              <FormattedMessage
                defaultMessage="During the event, the quotes people pick will appear here."
                id="5FUiH2"
                description="src/views/CampaignDetail/QuoteWall band empty-state, line 1"
              />
              <br />
              <FormattedMessage
                defaultMessage="Pick a line you love from an article and put it on the wall ✍️"
                id="md2Ml3"
                description="src/views/CampaignDetail/QuoteWall band empty-state prompt"
              />
            </p>
          </div>
        )}
      </section>
    )
  }

  return (
    <section className={styles.quoteWall}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <FormattedMessage defaultMessage="Quote wall" id="1HLo+Y" />
        </h2>
        <a
          className={styles.museum}
          href={EXTERNAL_LINKS.SEVEN_DAY_BOOK_QUOTE_WALL}
          target="_blank"
          rel="noreferrer"
        >
          <FormattedMessage defaultMessage="Full wall →" id="Ds+7ro" />
        </a>
      </header>

      <div className={styles.previewWall}>
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>

      {totalCount > quotes.length && (
        <QuoteWallDialog shortHash={shortHash} totalCount={totalCount}>
          {({ openDialog }) => (
            <Button
              spacing={[8, 0]}
              textColor="green"
              textActiveColor="greenDark"
              onClick={openDialog}
              aria-haspopup="dialog"
            >
              <TextIcon size={14} weight="medium">
                <FormattedMessage
                  defaultMessage="View all {count} quotes"
                  id="epZb9X"
                  values={{ count: totalCount }}
                />
              </TextIcon>
            </Button>
          )}
        </QuoteWallDialog>
      )}
    </section>
  )
}

export default QuoteWall
