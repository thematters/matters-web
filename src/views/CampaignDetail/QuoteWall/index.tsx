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
    { variables: { shortHash, first: PREVIEW_COUNT, random: true } },
    { publicQuery: !viewer.isAuthed }
  )

  const campaign =
    data?.campaign?.__typename === 'WritingChallenge'
      ? data.campaign
      : undefined
  const totalCount = campaign?.quoteCount ?? 0
  const quotes: Quote[] = (campaign?.quotes?.edges || [])
    .map(({ node }) => node)
    .slice(0, PREVIEW_COUNT)

  // nothing on the wall yet → hide the module entirely
  if (totalCount <= 0) {
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
          {totalCount > quotes.length && (
            <QuoteWallDialog shortHash={shortHash} totalCount={totalCount}>
              {({ openDialog }) => (
                <Button
                  spacing={[4, 0]}
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
        </header>

        <div className={styles.bandRow}>
          {quotes.map((quote, i) => (
            <QuoteCard key={quote.id} quote={quote} index={i} />
          ))}
        </div>
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
        {quotes.map((quote, i) => (
          <QuoteCard key={quote.id} quote={quote} index={i} />
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
